import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

export async function initialiseDatabase() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "spot",
      password: "spot-passwd",
      database: "dbSpotMinder",
    });
  } catch (err) {
    console.error("Erreur de la connexion à la base de donnée : ", err);
    process.exit(1);
  }
}

function getConnection(): mysql.Connection {
  if (!connection) {
    throw new Error("La connexion à la base de données n'est pas initialisée.");
  }
  return connection;
}

export async function addUser(
  pseudo: string,
  nom: string,
  prenom: string,
  mail: string,
  mdp: string,
) {
  try {
    const conn = getConnection(); // Vérifie l'initialisation de `connection`

    const [result] = await conn.execute(
      "INSERT INTO utilisateur (pseudo, nom, prenom, mail, mot_de_passe) VALUES (?, ?, ?, ?, ?)",
      [pseudo, nom, prenom, mail, mdp],
    );
    return result;
  } catch (err) {
    console.error("Erreur lors de l'ajout d'un utilisateur :", err);
    throw err;
  }
}

export async function getUsers() {
  try {
    const conn = getConnection(); // Vérifie l'initialisation de `connection`

    const [rows] = await conn.execute("SELECT * FROM utilisateur");
    return rows;
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    throw err;
  }
}
