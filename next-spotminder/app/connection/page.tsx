"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Importer signIn
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
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Connection() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    pseudo: "",
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
      const result = await signIn("credentials", {
        redirect: false, // Ne pas rediriger automatiquement
        pseudo: formData.pseudo,
        mdp: formData.mdp,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        router.push("/dashboard"); // Redirige manuellement
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
                  Connexion
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Connectez-vous à votre compte Spot Minder
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
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-gray-600">Pas de compte ? </span>
                    <Link href="/inscription" className="font-medium text-black hover:underline">
                      S'inscrire
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