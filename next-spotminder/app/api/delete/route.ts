import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getConnection } from "../../../server/bdd";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const ids = url.searchParams.get("ids")?.split(",") || [];

    if (ids.length === 0) {
      return NextResponse.json({ message: "Aucun ID fourni" }, { status: 400 });
    }

    const connection = await getConnection();
    await connection.query("DELETE FROM annonce WHERE id IN (?)", [ids]);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}