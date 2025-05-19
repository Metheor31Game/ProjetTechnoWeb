"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AjouterAnnonce() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    titre: "",
    adresse: "",
    description: "",
    lien: "",
  });

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 401) {
          setIsAuthenticated(false);
          router.push("/connection");
        } else if (response.ok) {
          setIsAuthenticated(true);
        } else {
          throw new Error(
            "Erreur lors de la vérification de l'authentification",
          );
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
        router.push("/connection");
      }
    };
    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          titre: formData.titre,
          adresse: formData.adresse,
          description: formData.description,
          lien: formData.lien,
        }).toString(),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Erreur lors de l'ajout de l'annonce");
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erreur réseau, veuillez réessayer");
      setIsLoading(false);
    }
  };

  if (isAuthenticated === null) {
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
              Vérification de l authentification...
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
        <Card className="mx-auto max-w-md border-2 border-gray-300 bg-white shadow-xl">
          <CardHeader className="border-b border-gray-200 py-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Ajouter une annonce
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="titre"
                  className="text-sm font-medium text-gray-700"
                >
                  Titre *
                </Label>
                <Input
                  type="text"
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Titre de l'annonce"
                  required
                  className="mt-1 border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="adresse"
                  className="text-sm font-medium text-gray-700"
                >
                  Adresse *
                </Label>
                <Input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  placeholder="Adresse du bien"
                  required
                  className="mt-1 border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description de l'annonce ..."
                  className="mt-1 border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="lien"
                  className="text-sm font-medium text-gray-700"
                >
                  Lien
                </Label>
                <Input
                  type="text"
                  id="lien"
                  name="lien"
                  value={formData.lien}
                  onChange={handleChange}
                  placeholder="www.le_lien_de_lannonce.com"
                  className="mt-1 border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors disabled:bg-blue-500"
              >
                {isLoading ? "Ajout en cours..." : "Ajouter une annonce"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
