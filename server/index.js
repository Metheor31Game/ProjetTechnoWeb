const express = require("express");
const path = require("path");
const session = require('express-session');
const bcrypt = require('bcrypt');
const { engine } = require("express-handlebars");
const { initialiseDatabase, closeDatabase, connection } = require("./bdd"); // Importer `connection`
const { log } = require("console");

const app = express();
const port = 3000;

// Configuration du moteur de template Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));
// Middleware pour parser le corps des requêtes en JSON ou en URL-encoded
app.use(express.urlencoded({ extended: true })); // Pour les formulaires classiques
app.use(express.json()); // Pour les données JSON
app.use(express.static("public"))

app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true, // Protéger contre les XSS
      secure: false,  // Activer uniquement si HTTPS est utilisé
      sameSite: 'lax', // Protection contre CSRF
      maxAge: 1000 * 60 // 1 jour en millisecondes
  }
}));

let currentUser = "";


// Route principale
app.get("/", (req, res) => {
  res.render("home", {
    title: "Bienvenue",
    description: "Ceci est un site internet qui utilise handlebars",
  });
});

// Route pour récupérer les données
app.get("/data", async (req, res) => {
  let connection = await initialiseDatabase();
  if (!connection) {
    return res.status(500).json({ message: "Erreur de connexion à la base de données" });
  }

  try {
    // Effectuer la requête pour récupérer tous les utilisateurs
    const [rows] = await connection.query("SELECT * FROM utilisateur");

    // Envoyer les données sous forme de JSON
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des données : ", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Route pour se connecter (GET)
app.get("/connection", (req, res) => {
  return res.render("connection", {});
});

// Route pour gérer la connexion (POST)
app.post("/connection", async (req, res) => {
  const pseudo = req.body.pseudo;
  const mdp = req.body.mdp;

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT pseudo, mdp FROM `utilisateur` WHERE pseudo = ?",
      [pseudo]
    );

    if (rows.length > 0) {
      const storedPassword = rows[0].mdp;
      const match = await bcrypt.compare(mdp, storedPassword);  // Comparaison des mots de passe hachés
      if (match) {
        req.session.user = pseudo;
        res.redirect("/dashboard");
      } else {
        res.status(401)//.send("Mot de passe incorrect");
        setTimeout(() =>{
          res.redirect("/connection")
        }, 1000)
      }
    } else {

      res.status(401)//.send("Utilisateur non trouvé");
      setTimeout(  () => {
        res.redirect("/connection")
      }, 1000)

    }
  } catch (err) {
    console.error("Erreur lors de la connexion : ", err);
    res.status(500).send("Erreur lors de la connexion");
  }
});

// Route pour déconnexion
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect("/connection");  // Redirige l'utilisateur vers la page de connexion après la déconnexion
  });
});


// Route pour s'inscrire
app.get("/inscription", (req, res) => {
  return res.render("inscription", {});
});

// Route pour gérer l'inscription (POST)
app.post("/inscription", async (req, res) => {
  const { pseudo, nom, prenom, mail, mdp } = req.body;

  if (!pseudo || !nom || !prenom || !mail || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const connection = await initialiseDatabase();
    const hashedPassword = await bcrypt.hash(mdp, 10);  // Hachage du mot de passe

    console.log("longueur : "+hashedPassword.length);

    // Insérer l'utilisateur dans la base de données
    const result = await connection.query(
      "INSERT INTO utilisateur (pseudo, nom, prenom, mail, mdp) VALUES (?, ?, ?, ?, ?)",
      [pseudo, nom, prenom, mail, hashedPassword]
    );

    res.redirect("/connection");
  } catch (err) {
    console.error("Erreur lors de l'inscription : ", err);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});


//Route pour son dashboard
app.get("/dashboard", async (req, res) => {
  if (!req.session.user) {  // Vérifie si un utilisateur est connecté
    return res.redirect("/connection");
  }

  const currentUser = req.session.user;  // Récupère le pseudo de l'utilisateur depuis la session
  console.log("Utilisateur connecté : " + currentUser);

  let connection = await initialiseDatabase();
  if (!connection) {
    return res.status(500).json({ message: "Erreur de connexion à la base de données" });
  }

  try {
    const [dashboard] = await connection.query("SELECT id_dashboard FROM dashboard WHERE pseudo_user = ?", [currentUser]);

    if (!dashboard[0]?.id_dashboard) {
      return res.status(404).json({ message: "Dashboard introuvable" });
    }

    const dashboardId = dashboard[0].id_dashboard;
    const [annonces] = await connection.query("SELECT * FROM annonce WHERE id_dashboard = ?", [dashboardId]);

    if (annonces.length === 0) {
      return res.status(404).json({ message: "Aucune annonce trouvée pour ce dashboard" });
    }

    res.render("dashboard", {
      title: "Dashboard",
      annonces: annonces
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces : ", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});


app.get('/upload', (req, res) => {
  if (currentUser == "") {
    return res.redirect("/connection")
  }
  res.render("upload", {})
})


app.post("/upload", async (req, res) => {


  const { titre, adresse, description, lien } = req.body;

  if (!titre) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const connection = await initialiseDatabase();

    // Insérer l'annonce dans la base de donnée
    const [dashboard] = await connection.query("SELECT id_dashboard FROM dashboard WHERE pseudo_user = (?)",
      [currentUser])
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






// Lancer la base de données et le serveur
initialiseDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur sur écoute : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la DATABASE : ", err);
  });

// Fermeture propre de la base de données lors de l'arrêt du serveur
process.on("SIGINT", async () => {
  console.log("Arrêt du serveur...");
  await closeDatabase();
  process.exit(0);
});
