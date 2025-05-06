"use client"

import Link from "next/link"

/**
 * Bouton personnalisable avec différentes variantes
 */
export default function CustomButton({
  children,
  href,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) {
  // Styles de base et variantes
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black",
    secondary: "bg-white text-black border border-black hover:bg-gray-100 focus:ring-black",
    outline: "bg-transparent text-black border border-black hover:bg-gray-100 focus:ring-black",
  }

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm rounded",
    medium: "px-5 py-2.5 text-base rounded-md",
    large: "px-6 py-3 text-lg rounded-lg",
  }

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  // Si un lien est fourni, renvoyer un composant Link
  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children}
      </Link>
    )
  }

  // Sinon, renvoyer un bouton standard
  return (
    <button className={buttonStyles} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

