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
    } catch (err) {
      setError("Erreur réseau, veuillez réessayer");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[50vh] flex-col bg-white">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-auto">
          <div className="mx-auto max-w-md">
            <Card className="border-gray-200 bg-white shadow-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl font-bold text-black">
                  Inscription
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Créez votre compte Spot Minder
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pseudo" className="text-black">
                      Pseudo
                    </Label>
                    <Input
                      id="pseudo"
                      name="pseudo"
                      value={formData.pseudo}
                      onChange={handleChange}
                      placeholder="Entrez votre pseudo"
                      required
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nom" className="text-black">
                        Nom
                      </Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Entrez votre nom"
                        required
                        className="border-gray-300 focus:border-black focus:ring-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prenom" className="text-black">
                        Prénom
                      </Label>
                      <Input
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Entrez votre prénom"
                        required
                        className="border-gray-300 focus:border-black focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mail" className="text-black">
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
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mdp" className="text-black">
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
                        className="border-gray-300 focus:border-black focus:ring-black pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? "Inscription en cours..." : "S'inscrire"}
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-gray-600">Déjà un compte ? </span>
                    <Link href="/connection" className="font-medium text-black hover:underline">
                      Se connecter
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}