import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { getConnection } from "../../../server/bdd";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.pseudo) {
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const pseudo = session.user.pseudo;

    const connection = await getConnection();
    const [dashboard]: any = await connection.query(
      "SELECT id_dashboard FROM dashboard WHERE pseudo_user = ?",
      [pseudo]
    );

    if (!dashboard[0]?.id_dashboard) {
      return NextResponse.json({ message: "Dashboard introuvable" }, { status: 404 });
    }

    const [rows]: any = await connection.query(
      "SELECT id, titre, date, adresse FROM annonce WHERE id_dashboard = ?",
      [dashboard[0].id_dashboard]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}