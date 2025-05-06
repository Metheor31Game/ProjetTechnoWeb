import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-[50vh] flex-col bg-white">

      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl">Spot Minder</h1>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="default" className="w-full sm:w-auto bg-black text-white hover:bg-gray-800">
                <Link href="/connection">Se connecter</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto border-black text-black hover:bg-gray-100">
                <Link href="/inscription">S'inscrire</Link>
              </Button>
            </div>

            <Card className="bg-white text-black shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Notre Solution :</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-black">
                  Nous concevons une interface simplifiant la vie lors de la recherche d'annonces immobilières.
                </CardDescription>
                <div className="mt-6">
                  <Button asChild variant="link" className="text-black underline hover:text-gray-700">
                    <Link href="#">Découvrir nos services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

    </div>
  )
}

