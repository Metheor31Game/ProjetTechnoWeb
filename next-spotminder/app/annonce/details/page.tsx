"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Annonce {
  id: string;
  titre: string;
  date: string;
  adresse: string;
  description: string;
  lien: string | null;
}

export default function AnnonceDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [annonce, setAnnonce] = useState<Annonce | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/annonce/${id}`)
        .then((res) => res.json())
        .then((data) => setAnnonce(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!annonce) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{annonce.titre}</h1>
      <p>Date : {annonce.date}</p>
      <p>Adresse : {annonce.adresse}</p>
      <p>Description : {annonce.description}</p>
      {annonce.lien && (
        <a href={annonce.lien} target="_blank" rel="noopener noreferrer">
          Lien
        </a>
      )}
    </div>
  );
}