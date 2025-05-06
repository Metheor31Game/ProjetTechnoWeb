import { createConnection } from "mysql2/promise";
import { config } from "dotenv";

config();

let connection = null;

async function getConnection() {
  if (!connection) {
    connection = await createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "adminspotminder",
      database: process.env.DB_NAME || "dbSpotMinder",
      port: parseInt(process.env.DB_PORT || "3306"),
    });
    console.log("Connexion à la base de données établie !");
  }
  return connection;
}

async function closeConnection() {
  if (connection) {
    await connection.end();
    connection = null;
    console.log("Connexion à la base de données fermée.");
  }
}

export { getConnection, closeConnection };