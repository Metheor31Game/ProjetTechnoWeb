"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Inscription() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    pseudo: "",
    nom: "",
    prenom: "",
    mail: "",
    mdp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          pseudo: formData.pseudo,
          nom: formData.nom,
          prenom: formData.prenom,
          mail: formData.mail,
          mdp: formData.mdp,
        }).toString(),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/connection");
      } else {
        setError(data.message || "Erreur lors de l'inscription");
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erreur réseau, veuillez réessayer");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-blue-100 px-4">
      <Card className="w-full max-w-md border-2 border-gray-300 bg-white shadow-xl">
        <CardHeader className="space-y-2 text-center border-b border-gray-200 py-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Inscription
          </CardTitle>
          <CardDescription className="text-gray-500">
            Créez votre compte Spot Minder
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="pseudo"
                className="text-sm font-medium text-gray-700"
              >
                Pseudo
              </Label>
              <Input
                id="pseudo"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                placeholder="Entrez votre pseudo"
                required
                className="border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="nom"
                  className="text-sm font-medium text-gray-700"
                >
                  Nom
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Entrez votre nom"
                  required
                  className="border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="prenom"
                  className="text-sm font-medium text-gray-700"
                >
                  Prénom
                </Label>
                <Input
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Entrez votre prénom"
                  required
                  className="border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mail"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="mail"
                name="mail"
                type="email"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Entrez votre email"
                required
                className="border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mdp"
                className="text-sm font-medium text-gray-700"
              >
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="mdp"
                  name="mdp"
                  type={showPassword ? "text" : "password"}
                  value={formData.mdp}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  required
                  className="border-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-blue-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button
              type="submit"
              className="w-full rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors disabled:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Déjà un compte ? </span>
              <Link
                href="/connection"
                className="font-medium text-blue-700 hover:text-blue-900 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
