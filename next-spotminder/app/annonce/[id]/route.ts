import { NextResponse } from "next/server";
import { getConnection } from "../../../../server/bdd"; // Ajuste le chemin

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const connection = await getConnection();
    const [rows]: any = await connection.query(
      "SELECT * FROM annonce WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return NextResponse.json({ message: "Annonce non trouvée" }, { status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la récupération de l'annonce :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}