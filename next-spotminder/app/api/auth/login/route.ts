import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getConnection } from "../../../../server/bdd";
export async function POST(req: Request) {
  try {
    const { pseudo, mdp } = await req.json();

    // Récupérer la connexion à la base de données
    const connection = await getConnection();

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

    // Pas besoin de fermer la connexion ici, car elle est réutilisée
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (err) {
    console.error("Erreur de connexion :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}