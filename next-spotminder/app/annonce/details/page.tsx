"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Annonce {
  id: string;
  titre: string;
  date: string;
  adresse: string;
  description: string;
  lien: string | null;
}

export default function AnnonceDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [annonce, setAnnonce] = useState<Annonce | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/annonce/details?id=${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status === 404 ? "Annonce non trouvée" : "Erreur serveur");
          return res.json();
        })
        .then((data) => setAnnonce(data))
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    }
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <Card className="mx-auto max-w-md border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">
              Erreur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!annonce) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <Card className="mx-auto max-w-md border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">
              Chargement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Chargement des détails...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <Link href="/dashboard">
            <Button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
              Retour au dashboard
            </Button>
          </Link>
        </div>
        <Card className="mx-auto max-w-2xl border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">
              {annonce.titre}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Détails de l'annonce
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-4">
              <p className="font-semibold text-gray-700 text-sm">Date de mise en ligne</p>
              <p className="text-gray-600 text-base">{annonce.date}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-700 text-sm">Adresse</p>
              <p className="text-gray-600 text-base">{annonce.adresse}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-700 text-sm">Description</p>
              <p className="text-gray-600 text-base">
                {annonce.description || "Aucune description fournie"}
              </p>
            </div>
            {annonce.lien && (
              <div className="mb-4">
                <p className="font-semibold text-gray-700 text-sm">Lien</p>
                <a
                  href={annonce.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm hover:text-blue-800"
                >
                  Visiter le lien
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}