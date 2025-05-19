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
          if (!res.ok)
            throw new Error(
              res.status === 404 ? "Annonce non trouvée" : "Erreur serveur",
            );
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-blue-100 px-4">
        <Card className="mx-auto max-w-md border-2 border-gray-300 bg-white shadow-xl">
          <CardHeader className="border-b border-gray-200 py-6">
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Erreur
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-center text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!annonce) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-blue-100 px-4">
        <Card className="mx-auto max-w-md border-2 border-gray-300 bg-white shadow-xl">
          <CardHeader className="border-b border-gray-200 py-6">
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Chargement
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-center text-gray-600">
              Chargement des détails...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Link href="/dashboard">
            <Button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
              Retour au dashboard
            </Button>
          </Link>
        </div>
        <Card className="mx-auto max-w-2xl border-2 border-gray-300 bg-white shadow-xl">
          <CardHeader className="border-b border-gray-200 py-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {annonce.titre}
            </CardTitle>
            <CardDescription className="text-gray-500">
              Détails de l annonce
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="font-semibold text-gray-700 text-sm">
                Date de mise en ligne
              </p>
              <p className="text-gray-600 text-base">{annonce.date}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 text-sm">Adresse</p>
              <p className="text-gray-600 text-base">{annonce.adresse}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 text-sm">Description</p>
              <p className="text-gray-600 text-base">
                {annonce.description || "Aucune description fournie"}
              </p>
            </div>
            {annonce.lien && (
              <div>
                <p className="font-semibold text-gray-700 text-sm">Lien</p>
                <a
                  href={annonce.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline text-sm hover:text-blue-900 transition-colors"
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
