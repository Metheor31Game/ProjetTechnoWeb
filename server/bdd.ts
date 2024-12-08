import mysql, { Connection } from "mysql2/promise";

let connection: Connection | null = null;

export async function initialiseDatabase() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "spot",
      password: process.env.DB_PASSWORD || "spot-passwd",
      database: process.env.DB_NAME || "dbSpotMinder",
    });
    console.log("Connexion à la base de données réussie !");
  } catch (err) {
    console.error("Erreur lors de la connexion à la base de données : ", err);
    throw new Error("Impossible de se connecter à la base de données.");
  }
}

export async function closeDatabase() {
  if (connection) {
    try {
      await connection.end();
      console.log("Connexion à la base de données fermée.");
    } catch (err) {
      console.error("Erreur lors de la fermeture de la connexion : ", err);
    }
  }
}
