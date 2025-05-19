const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { engine } = require("express-handlebars");
const cors = require("cors");

const { initialiseDatabase, closeDatabase } = require("./bdd");

const app = express();
const port = 3000;

// - - - - - - - - - MIDDLEWARE  - - - - - - - - -
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "votre_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      // sameSite: "none", // Décommenter pour tester si sameSite pose problème
      maxAge: 1000 * 60 * 60,
    },
  }),
);

// - - - - - - - - - LES ROUTES  - - - - - - - - -

// Middleware pour vérifier si un utilisateur est connecté
const requireAuth = (req, res, next) => {
  console.log("Session (requireAuth):", req.session);
  console.log("Cookies (requireAuth):", req.headers.cookie);
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Non authentifié. Veuillez vous connecter." });
  }
  next();
};

// Route pour tester l'état de la session
app.get("/test-session", (req, res) => {
  console.log("Test Session:", req.session);
  if (req.session.user) {
    res.status(200).json({ user: req.session.user, message: "Session active" });
  } else {
    res.status(401).json({ message: "Aucune session active" });
  }
});

// Route pour récupérer les informations de l'utilisateur connecté
app.get("/user", requireAuth, async (req, res) => {
  const currentUser = req.session.user;

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT prenom, nom FROM utilisateur WHERE pseudo = ?",
      [currentUser],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ prenom: rows[0].prenom, nom: rows[0].nom });
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des infos utilisateur :",
      err,
    );
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Route principale
app.get("/", (req, res) => {
  if (req.session.user) {
    res.status(200);
  }
  res.status(200).render("home", {
    title: "Bienvenue",
    description: "Ceci est un site internet qui utilise handlebars",
  });
});

// Route pour s'inscrire
app.get("/inscription", (req, res) => {
  res.status(200).render("inscription", {});
});

// Route pour gérer l'inscription (POST)
app.post("/inscription", async (req, res) => {
  const { pseudo, nom, prenom, mail, mdp } = req.body;

  if (!pseudo || !nom || !prenom || !mail || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const connection = await initialiseDatabase();
    const hashedPassword = await bcrypt.hash(mdp, 10);

    await connection.query(
      "INSERT INTO utilisateur (pseudo, nom, prenom, mail, mdp) VALUES (?, ?, ?, ?, ?)",
      [pseudo, nom, prenom, mail, hashedPassword],
    );

    await connection.query("INSERT INTO dashboard (pseudo_user) VALUES (?)", [
      pseudo,
    ]);

    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
});

// Route pour se connecter
app.get("/connection", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: "Déjà connecté" });
  } else {
    res.status(200).render("connection", {});
  }
});

// Route pour gérer la connexion (POST)
app.post("/connection", async (req, res) => {
  const { pseudo, mdp } = req.body;

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT pseudo, mdp FROM utilisateur WHERE pseudo = ?",
      [pseudo],
    );

    if (rows.length > 0) {
      const match = await bcrypt.compare(mdp, rows[0].mdp);
      if (match) {
        req.session.user = pseudo;
        console.log("Connexion réussie, session enregistrée:", req.session);
        return res.status(200).json({ message: "Connexion réussie" });
      } else {
        return res.status(401).json({ message: "Mot de passe incorrect." });
      }
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
});

// Route pour se déconnecter
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la déconnexion." });
    }
    res.status(200).json({ message: "Déconnexion réussie" });
  });
});

// Route pour le dashboard
app.get("/dashboard", requireAuth, async (req, res) => {
  const currentUser = req.session.user;

  try {
    const connection = await initialiseDatabase();
    const [dashboard] = await connection.query(
      "SELECT id_dashboard FROM dashboard WHERE pseudo_user = ?",
      [currentUser],
    );

    if (!dashboard[0]?.id_dashboard) {
      return res.status(404).json({ message: "Dashboard introuvable." });
    }

    const [annonces] = await connection.query(
      "SELECT * FROM annonce WHERE id_dashboard = ?",
      [dashboard[0].id_dashboard],
    );

    res.status(200).json(annonces);
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Route pour supprimer des annonces
app.get("/delete", requireAuth, async (req, res) => {
  const ids = req.query.ids;

  if (!ids) {
    return res
      .status(400)
      .json({ message: "Aucun ID fourni pour suppression." });
  }

  const idArray = ids.split(",");

  try {
    const connection = await initialiseDatabase();
    const placeholders = idArray.map(() => "?").join(",");
    const query = `DELETE FROM annonce WHERE id IN (${placeholders})`;

    await connection.query(query, idArray);

    res.status(200).json({ message: "Suppression réussie" });
  } catch (err) {
    console.error("Erreur lors de la suppression des annonces :", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression des annonces." });
  }
});

// Route pour afficher les détails d'une annonce
app.get("/annonce/details", requireAuth, async (req, res) => {
  const annonceId = req.query.id;

  if (!annonceId) {
    return res.status(400).json({ message: "ID de l'annonce manquant." });
  }

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT * FROM annonce WHERE id = ?",
      [annonceId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Annonce introuvable." });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des détails de l'annonce :",
      err,
    );
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

app.get("/upload", requireAuth, (req, res) => {
  res.render("upload", {});
});

app.post("/upload", requireAuth, async (req, res) => {
  const { titre, adresse, description, lien } = req.body;
  const date = new Date();
  const dateSansHeure = date.toLocaleDateString();
  if (!titre) {
    return res.status(400).json({ message: "Champ titre requis" });
  }

  try {
    const connection = await initialiseDatabase();

    const [dashboard] = await connection.query(
      "SELECT id_dashboard FROM dashboard WHERE pseudo_user = (?)",
      [req.session.user],
    );
    const result = await connection.query(
      "INSERT INTO annonce (id_dashboard, titre, date, adresse, description, lien) VALUES (?, ?, ?, ?, ?, ?)",
      [
        dashboard[0].id_dashboard,
        titre,
        dateSansHeure,
        adresse,
        description,
        lien,
      ],
    );

    res.status(201).json({ message: "Annonce ajoutée" });
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'annonce  : ", err);
    res.status(500).json({ message: "Erreur lors de l'ajout d'une annonce" });
  }
});

// Route pour récupérer les annonces
app.get("/annonces/:id?", requireAuth, async (req, res) => {
  try {
    const connection = await initialiseDatabase();
    const annonceId = req.params.id;

    if (annonceId) {
      const [rows] = await connection.query(
        "SELECT * FROM annonce WHERE id = ?",
        [annonceId],
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Annonce introuvable." });
      }
      return res.json(rows[0]);
    }

    const [rows] = await connection.query("SELECT * FROM annonce");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces:", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Lancer le serveur
initialiseDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur sur écoute : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la DATABASE :", err);
  });

// Traiter la fermeture du serveur
process.on("SIGINT", async () => {
  console.log("Arrêt du serveur...");
  await closeDatabase();
  process.exit(0);
});

module.exports = { app };
