"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Annonce {
  id: string;
  titre: string;
  date: string;
  adresse: string;
  description?: string;
  lien?: string | null;
}

interface User {
  prenom: string;
  nom: string;
}

interface DashboardProps {
  title: string;
}

const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  const router = useRouter();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Vérifier l'authentification, récupérer les annonces et les infos utilisateur
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        console.log("Début de la requête GET /dashboard");
        const annoncesResponse = await fetch(
          "http://localhost:3000/dashboard",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const responseText = await annoncesResponse.text();
        console.log("Statut /dashboard:", annoncesResponse.status);
        console.log("Réponse /dashboard:", responseText);
        if (annoncesResponse.status === 401) {
          console.log("Non autorisé, redirection vers /connection");
          setIsAuthenticated(false);
          router.push("/connection");
          return;
        } else if (!annoncesResponse.ok) {
          console.error("Erreur HTTP:", annoncesResponse.status, responseText);
          throw new Error("Erreur lors de la récupération des annonces");
        }

        setIsAuthenticated(true);
        const annoncesData = JSON.parse(responseText);
        console.log("Données annonces:", annoncesData);
        setAnnonces(annoncesData);

        // Récupérer les infos utilisateur
        console.log("Début de la requête GET /user");
        const userResponse = await fetch("http://localhost:3000/user", {
          method: "GET",
          credentials: "include",
        });
        const userResponseText = await userResponse.text();
        console.log("Statut /user:", userResponse.status);
        console.log("Réponse /user:", userResponseText);
        if (!userResponse.ok) {
          console.error(
            "Erreur GET /user:",
            userResponse.status,
            userResponseText,
          );
          throw new Error(
            "Erreur lors de la récupération des infos utilisateur",
          );
        }
        const userData = JSON.parse(userResponseText);
        console.log("Données utilisateur:", userData);
        setUser({ prenom: userData.prenom, nom: userData.nom });

        setLoading(false);
      } catch (err) {
        console.error("Erreur dans checkAuthAndFetchData:", err);
        setIsAuthenticated(false);
        router.push("/connection");
      }
    };
    checkAuthAndFetchData();
  }, [router]);

  // Gérer la sélection des cases à cocher
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert("Veuillez sélectionner au moins une annonce à supprimer.");
      return;
    }

    const separator = ",";
    const url = `http://localhost:3000/delete?ids=${selectedIds.join(separator)}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setAnnonces(
          annonces.filter((annonce) => !selectedIds.includes(annonce.id)),
        );
        setSelectedIds([]);
      } else {
        alert(data.message || "Erreur lors de la suppression des annonces");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression des annonces");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
      });
      router.push("/connection");
    } catch (err) {
      console.error(err);
      router.push("/connection");
    }
  };

  if (isAuthenticated === null || loading) {
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
              Chargement des annonces...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-blue-100 py-12 relative">
      <div className="absolute top-4 right-4">
        {user && (
          <p className="text-gray-900 font-semibold text-sm">
            {user.prenom} {user.nom}
          </p>
        )}
      </div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h1>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Button
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            onClick={() => router.push("/")}
          >
            Accueil
          </Button>
          <Button
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            onClick={() => router.push("/upload")}
          >
            Ajouter une annonce
          </Button>
          <Button
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            onClick={deleteSelected}
          >
            Supprimer les annonces sélectionnées
          </Button>
          <Button
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </div>

        {annonces.length > 0 ? (
          <div className="grid gap-4">
            {annonces.map((annonce) => (
              <Card
                key={annonce.id}
                className="border-2 border-gray-300 bg-white shadow-xl"
              >
                <CardContent className="flex items-center p-4">
                  <Input
                    type="checkbox"
                    id={`checkbox-${annonce.id}`}
                    checked={selectedIds.includes(annonce.id)}
                    onChange={() => handleCheckboxChange(annonce.id)}
                    className="mr-4 h-5 w-5 border-2 border-gray-300 focus:ring-blue-600"
                  />
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      router.push(`/annonce/details?id=${annonce.id}`)
                    }
                  >
                    <h2 className="text-lg font-semibold text-gray-900">
                      {annonce.titre}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Date de mise en ligne : {annonce.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      Adresse : {annonce.adresse}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-md border-2 border-gray-300 bg-white shadow-xl">
            <CardContent className="p-6">
              <p className="text-center text-gray-600">
                Aucune annonce disponible pour le moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
