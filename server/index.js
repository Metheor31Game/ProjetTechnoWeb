const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
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
  res.render("connection", {});
});

// Route pour gérer la connexion (POST)
app.post("/connection", async (req, res) => {
  // const { pseudo, mdp } = req.body;
  const pseudo = req.body.pseudo;
  const mdp = req.body.mdp;
  console.log("pseudo : " + pseudo + "  MDP : " + mdp);

  try {
    // Connexion à la base de données
    const connection = await initialiseDatabase();

    // Requête SQL pour vérifier le pseudo et récupérer le mot de passe
    const [rows] = await connection.query(
      "SELECT mdp FROM `utilisateur` WHERE pseudo = ?",
      [pseudo]
    );

    if (rows.length > 0) {
      // Si un utilisateur est trouvé avec ce pseudo, on récupère le mot de passe
      const password = rows[0].mdp;
      console.log(password);  // Affichage du mot de passe récupéré

      // Ici, vous pouvez vérifier si le mot de passe est correct
      // Par exemple, comparer mdp avec celui dans la base (en clair ou en utilisant bcrypt)
      if (password === mdp) {
        res.redirect("/");  // Rediriger vers la page d'accueil si la connexion est réussie
      } else {
        res.status(401).send("Mot de passe incorrect");
      }
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }

  } catch (err) {
    console.error("Problème de connexion : ", err);
    res.status(500).send("Erreur lors de la connexion");
  }
});


// Route pour s'inscrire
app.get("/inscription", (req, res) => {
  res.render("inscription", {});
});

// Route pour gérer l'inscription (POST)
app.post("/inscription", async (req, res) => {
  const { pseudo, nom, prenom, mail, mdp } = req.body;

  // Validation des données
  if (!pseudo || !nom || !prenom || !mail || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Connexion à la base de données
    const connection = await initialiseDatabase();

    // Insérer l'utilisateur dans la base de données
    const result = await connection.query(
      "INSERT INTO utilisateur (pseudo, nom, prenom, mail, mdp) VALUES (?, ?, ?, ?, ?)",
      [pseudo, nom, prenom, mail, mdp]
    );

    // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
    res.redirect("/connection");
  } catch (err) {
    console.error("Erreur lors de l'inscription : ", err);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});










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
