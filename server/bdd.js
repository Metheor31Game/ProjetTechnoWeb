const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Charger les variables d'environnement
dotenv.config();

let connection = null;

async function initialiseDatabase() {
  // Afficher les variables d'environnement pour vérifier leur lecture
  // console.log("DB_HOST:", process.env.DB_HOST);
  // console.log("DB_USER:", process.env.DB_USER);
  // console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
  // console.log("DB_NAME:", process.env.DB_NAME);
  // console.log("DB_PORT:", process.env.DB_PORT);

  try {
    // Utilisation des variables d'environnement pour la connexion
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",  // En cas d'absence dans .env, on utilise 'localhost' par défaut
      user: process.env.DB_USER || "root",      // Utilisation de 'root' par défaut si DB_USER n'est pas défini
      password: process.env.DB_PASSWORD || "adminspotminder",  // Mot de passe par défaut
      database: process.env.DB_NAME || "dbSpotMinder",  // Base de données par défaut
      port: parseInt(process.env.DB_PORT || '3306'),  // Utilisation du port par défaut si DB_PORT n'est pas défini
    });

    console.log("Connexion réussie !");

    // Vous pouvez également exécuter une requête simple pour vérifier si la base fonctionne
    const [rows] = await connection.query("SELECT * FROM utilisateur");
    console.log("Test de requête passé, la base de données répond." + rows);
    return connection;

  } catch (err) {
    console.error("Erreur de connexion : ", err);
  }
}

// Exporter `connection` pour l'utiliser dans `index.js`
module.exports = { connection, initialiseDatabase, closeDatabase };

async function closeDatabase() {
  if (connection) {
    try {
      await connection.end();
      console.log("Connexion à la base de données fermée.");
    } catch (err) {
      console.error("Erreur lors de la fermeture de la connexion : ", err);
    }
  }
}