"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const Dashboard: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Vérifier l'authentification, récupérer les annonces et les infos utilisateur
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        // Vérifier l'authentification et récupérer les annonces
        const annoncesResponse = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include",
        });
        if (annoncesResponse.status === 401) {
          setIsAuthenticated(false);
          router.push("/connection");
          return;
        } else if (!annoncesResponse.ok) {
          throw new Error("Erreur lors de la récupération des annonces");
        }

        setIsAuthenticated(true);
        const annoncesData = await annoncesResponse.json();
        setAnnonces(annoncesData);

        // Récupérer les infos utilisateur
        const userResponse = await fetch("http://localhost:3000/user", {
          method: "GET",
          credentials: "include",
        });
        if (!userResponse.ok) {
          throw new Error("Erreur lors de la récupération des infos utilisateur");
        }
        const userData = await userResponse.json();
        setUser({ prenom: userData.prenom, nom: userData.nom });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
        router.push("/connection");
      }
    };
    checkAuthAndFetchData();
  }, [router]);

  // Gérer la sélection des cases à cocher
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
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
        setAnnonces(annonces.filter((annonce) => !selectedIds.includes(annonce.id)));
        setSelectedIds([]); // Réinitialiser la sélection
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
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <Card className="mx-auto max-w-md border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">
              Chargement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Chargement des annonces...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col bg-white py-12 relative">
      <div className="absolute top-4 right-4">
        {user && (
          <p className="text-black font-semibold text-sm">
            {user.prenom} {user.nom}
          </p>
        )}
      </div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">{title}</h1>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Button
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            onClick={() => router.push("/")}
          >
            Accueil
          </Button>
          <Button
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            onClick={() => router.push("/upload")}
          >
            Ajouter une annonce
          </Button>
          <Button
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            onClick={deleteSelected}
          >
            Supprimer les annonces sélectionnées
          </Button>
          <Button
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </div>

        {annonces.length > 0 ? (
          <div className="grid gap-4">
            {annonces.map((annonce) => (
              <Card key={annonce.id} className="border-gray-200 shadow-md">
                <CardContent className="flex items-center p-4">
                  <Input
                    type="checkbox"
                    id={`checkbox-${annonce.id}`}
                    checked={selectedIds.includes(annonce.id)}
                    onChange={() => handleCheckboxChange(annonce.id)}
                    className="mr-4 h-5 w-5 border-gray-300"
                  />
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => router.push(`/annonce/details?id=${annonce.id}`)}
                  >
                    <h2 className="text-lg font-semibold text-black">{annonce.titre}</h2>
                    <p className="text-sm text-gray-600">Date de mise en ligne : {annonce.date}</p>
                    <p className="text-sm text-gray-600">Adresse : {annonce.adresse}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-md border-gray-200 shadow-md">
            <CardContent className="p-4">
              <p className="text-center text-gray-600">Aucune annonce disponible pour le moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;