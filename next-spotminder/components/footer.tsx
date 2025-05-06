import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-black">Spot Minder</h3>
            <p className="text-sm text-gray-600">
              Simplifiez votre recherche immobilière avec notre plateforme intuitive.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-black">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black hover:underline">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-black hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-black hover:underline">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-black">Contact</h3>
            <address className="not-italic text-sm text-gray-600">
              <p>Email: contact@spotminder.fr</p>
              <p className="mt-2">Téléphone: +33 1 23 45 67 89</p>
            </address>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-black">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Spot Minder. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

