import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getConnection } from "../../../../server/bdd"; // Ajuste le chemin selon ton arborescence

export async function POST(req: Request) {
  try {
    const { pseudo, nom, prenom, mail, mdp } = await req.json();

    // Vérifier si tous les champs sont présents
    if (!pseudo || !nom || !prenom || !mail || !mdp) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifier les longueurs maximales (conformément à la BDD)
    if (pseudo.length > 20 || nom.length > 20 || prenom.length > 20 || mail.length > 60 || mdp.length > 60) {
      return NextResponse.json(
        { message: "Un ou plusieurs champs dépassent la longueur maximale" },
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mdp, salt);

    // Connexion à la base de données
    const connection = await getConnection();

    // Vérifier si le pseudo ou l'email existe déjà
    const [existing]: any = await connection.query(
      "SELECT pseudo, mail FROM utilisateur WHERE pseudo = ? OR mail = ?",
      [pseudo, mail]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Pseudo ou email déjà utilisé" },
        { status: 409 }
      );
    }

    // Démarrer une transaction pour insérer dans les deux tables
    await connection.beginTransaction();

    try {
      // Insérer l'utilisateur
      await connection.query(
        "INSERT INTO utilisateur (pseudo, nom, prenom, mail, mdp) VALUES (?, ?, ?, ?, ?)",
        [pseudo, nom, prenom, mail, hashedPassword]
      );

      // Insérer un dashboard pour cet utilisateur
      await connection.query(
        "INSERT INTO dashboard (pseudo_user) VALUES (?)",
        [pseudo]
      );

      // Valider la transaction
      await connection.commit();
    } catch (err) {
      // En cas d'erreur, annuler la transaction
      await connection.rollback();
      throw err;
    }

    // Succès : retourner une réponse
    return NextResponse.json(
      { message: "Inscription réussie, vous pouvez vous connecter" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}