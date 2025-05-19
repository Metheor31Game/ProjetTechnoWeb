import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-blue-100">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Spot Minder
            </h1>

            <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                variant="default"
                className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Link href="/connection">Se connecter</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Link href="/inscription">S inscrire</Link>
              </Button>
            </div>

            <Card className="bg-white text-black border-2 border-gray-300 shadow-xl">
              <CardHeader className="border-b border-gray-200 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Notre Solution :
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-base text-gray-600">
                  Nous concevons une interface simplifiant la vie lors de la
                  recherche d annonces immobilières.
                </p>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="link"
                    className="text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <Link href="#">Découvrir nos services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
