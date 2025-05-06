import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-black">Spot Minder</span>
        </Link>

        <nav className="hidden space-x-4 md:flex">
          <Button asChild variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/about">À propos</Link>
          </Button>
          <Button asChild variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/services">Services</Link>
          </Button>
          <Button asChild variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>

        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}

