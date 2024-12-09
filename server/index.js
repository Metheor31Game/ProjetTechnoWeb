const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const { initialiseDatabase, closeDatabase, connection } = require("./bdd"); // Importer `connection`

const app = express();
const port = 3000;

// Configuration du moteur de template Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));

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

// Route pour se connecter
app.get("/connection", (req, res) => {
  res.render("connection", {});
});

// Route pour s'inscrire
app.get("/inscription", (req, res) => {
  res.render("inscription", {});
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
