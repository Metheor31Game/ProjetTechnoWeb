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

interface FormData {
  pseudo: string;
  mdp: string;
}

const Connection: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    pseudo: "",
    mdp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSubmitted) return;
    setHasSubmitted(true);
    setIsLoading(true);
    setError("");
    console.log("Soumission du formulaire de connexion");

    try {
      const response = await fetch("http://localhost:3000/connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo: formData.pseudo,
          mdp: formData.mdp,
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log(
        "Réponse POST /connection:",
        data,
        "Statut:",
        response.status,
      );
      if (response.ok) {
        console.log("Connexion réussie, redirection vers /dashboard");
        router.push("/dashboard");
      } else {
        setError(data.message || "Erreur lors de la connexion");
        setIsLoading(false);
        setHasSubmitted(false);
      }
    } catch (err) {
      console.error("Erreur réseau dans handleSubmit:", err);
      setError("Erreur réseau, veuillez réessayer");
      setIsLoading(false);
      setHasSubmitted(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-blue-100 px-4">
      <Card className="w-full max-w-md border-2 border-gray-300 bg-white shadow-xl">
        <CardHeader className="space-y-2 text-center border-b border-gray-200 py-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Connexion
          </CardTitle>
          <CardDescription className="text-gray-500">
            Accédez à votre compte Spot Minder
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6 border-t border-gray-200">
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
              disabled={isLoading || hasSubmitted}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Pas de compte ? </span>
              <Link
                href="/inscription"
                className="font-medium text-blue-700 hover:text-blue-900 transition-colors"
              >
                S inscrire
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Connection;
