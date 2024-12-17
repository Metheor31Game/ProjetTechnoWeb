// - - - - - - - - - LES IMPORTS - - - - - - - - - 
const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { engine } = require("express-handlebars");
const { initialiseDatabase, closeDatabase } = require("./bdd");

const app = express();
const port = 3000;

// - - - - - - - - - MIDDLEWARE  - - - - - - - - - 

// Configuration du moteur de template Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));
app.use(express.urlencoded({ extended: true })); // Pour les formulaires classiques
app.use(express.json()); // Pour les données JSON
app.use(express.static("public"));

// Gestion des sessions
app.use(
  session({
    secret: "votre_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 heure
    },
  })
);

// - - - - - - - - - LES ROUTES  - - - - - - - - - 

// Middleware pour vérifier si un utilisateur est connecté
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non authentifié. Veuillez vous connecter." });
  }
  next();
};

// Route principale
app.get("/", (req, res) => {
  if (req.session.user) {
    res.status(200).redirect("/dashboard");
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
      [pseudo, nom, prenom, mail, hashedPassword]
    );

    await connection.query("INSERT INTO dashboard (pseudo_user) VALUES (?)", [pseudo]);

    res.status(201).redirect("/connection");
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
});

// Route pour se connecter
app.get("/connection", (req, res) => {
  res.status(200).render("connection", {});
});

// Route pour gérer la connexion (POST)
app.post("/connection", async (req, res) => {
  const { pseudo, mdp } = req.body;

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT pseudo, mdp FROM utilisateur WHERE pseudo = ?",
      [pseudo]
    );

    if (rows.length > 0) {
      const match = await bcrypt.compare(mdp, rows[0].mdp);
      if (match) {
        req.session.user = pseudo;
        return res.status(200).redirect("/dashboard");
      } else {
        return res.status(401).render("connection", { message: "Mot de passe incorrect." });
      }
    } else {
      return res.status(404).render("connection", { message: "Utilisateur non trouvé." });
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
      return res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
    res.redirect("/connection");
  });
});

// Route pour le dashboard
app.get("/dashboard", requireAuth, async (req, res) => {
  const currentUser = req.session.user;

  try {
    const connection = await initialiseDatabase();
    const [dashboard] = await connection.query("SELECT id_dashboard FROM dashboard WHERE pseudo_user = ?", [
      currentUser,
    ]);

    if (!dashboard[0]?.id_dashboard) {
      return res.status(404).json({ message: "Dashboard introuvable." });
    }

    const [annonces] = await connection.query("SELECT * FROM annonce WHERE id_dashboard = ?", [
      dashboard[0].id_dashboard,
    ]);

    res.status(200).render("dashboard", {
      title: "Dashboard",
      annonces,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Route pour récupérer les annonces
app.get("/elements/:id?", async (req, res) => {
  try {
    const connection = await initialiseDatabase();
    const annonceId = req.params.id;

    if (annonceId) {
      const [rows] = await connection.query("SELECT * FROM annonce WHERE id = ?", [annonceId]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Annonce non trouvée." });
      }
      res.status(200).json(rows[0]);
    } else {
      const [rows] = await connection.query("SELECT * FROM annonce");
      res.status(200).json(rows);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Route pour supprimer des annonces
app.get("/delete", requireAuth, async (req, res) => {
  const ids = req.query.ids;

  if (!ids) {
    return res.status(400).json({ message: "Aucun ID fourni pour suppression." });
  }

  const idArray = ids.split(",");

  try {
    const connection = await initialiseDatabase();
    const placeholders = idArray.map(() => "?").join(",");
    const query = `DELETE FROM annonce WHERE id IN (${placeholders})`;

    await connection.query(query, idArray);

    res.status(200).redirect("/dashboard");
  } catch (err) {
    console.error("Erreur lors de la suppression des annonces :", err);
    res.status(500).json({ message: "Erreur lors de la suppression des annonces." });
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
    const [rows] = await connection.query("SELECT * FROM annonce WHERE id = ?", [annonceId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Annonce introuvable." });
    }

    res.status(200).render("annonces", {
      title: "Détails de l'annonce",
      annonce: rows[0],
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des détails de l'annonce :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

app.get('/upload', requireAuth, (req, res) => {
  res.render("upload", {})
})


app.post("/upload", requireAuth, async (req, res) => {


  const { titre, adresse, description, lien } = req.body;

  if (!titre) {
    return res.status(400).json({ message: "Champ titre requis"});
  }

  try {
    const connection = await initialiseDatabase();

    // Insérer l'annonce dans la base de donnée
    const [dashboard] = await connection.query("SELECT id_dashboard FROM dashboard WHERE pseudo_user = (?)",
      [req.session.user])
    const result = await connection.query(
      "INSERT INTO annonce (id_dashboard, titre, date, adresse, description) VALUES (?, ?, ?, ?, ?)",
      [dashboard[0].id_dashboard, titre, adresse, description, lien]
    );

    // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'annonce  : ", err);
    res.status(500).json({ message: "Erreur lors de l'ajout d'une annonce" });
  }
})

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable." });
});

// - - - - - - - - - INITIALISATION DE LA DATABASE - - - - - - - - - 

initialiseDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur sur écoute : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la DATABASE :", err);
  });

process.on("SIGINT", async () => {
  console.log("Arrêt du serveur...");
  await closeDatabase();
  process.exit(0);
});
