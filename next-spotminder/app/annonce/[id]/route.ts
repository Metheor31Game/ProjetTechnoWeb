import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3000/annonce/details?id=${id}`, {
      method: "GET",
      credentials: "include", // Inclure le cookie de session
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Erreur lors de la récupération de l'annonce" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la récupération de l'annonce :", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}