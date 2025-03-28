import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createConnection } from "mysql2/promise";

// Fonction pour se connecter à la base de données
async function connectToDB() {
  return await createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "adminspotminder",
    database: process.env.DB_NAME || "dbSpotMinder",
    port: parseInt(process.env.DB_PORT || "3306"),
  });
}

// Fonction de connexion (POST)
export async function POST(req: Request) {
  try {
    const { pseudo, mdp } = await req.json();

    // Connexion à la base de données
    const connection = await connectToDB();

    // Vérification de l'utilisateur
    const [rows]: any = await connection.query(
      "SELECT pseudo, mdp FROM utilisateur WHERE pseudo = ?",
      [pseudo],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 },
      );
    }

    // Vérification du mot de passe
    const match = await bcrypt.compare(mdp, rows[0].mdp);
    if (!match) {
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 401 },
      );
    }

    // Fermer la connexion
    await connection.end();

    // Redirection vers le dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (err) {
    console.error("Erreur de connexion :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
