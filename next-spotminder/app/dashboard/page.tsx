"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "../styles/dashboard.module.css";

interface Annonce {
  id: string;
  titre: string;
  date: string;
  adresse: string;
}

const Dashboard: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Récupérer la session
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);

  // Rediriger si non authentifié
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/connection");
    }
  }, [status, router]);

  // Récupérer les annonces
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.pseudo) return;

    const fetchAnnonces = async () => {
      try {
        const res = await fetch(`/api/annonces?pseudo=${session.user.pseudo}`);
        if (!res.ok) throw new Error("Erreur lors de la récupération des annonces");
        const data = await res.json();
        setAnnonces(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonces();
  }, [session, status]);

  const deleteSelected = async () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".annonce-checkbox:checked");
    const selectedIds = Array.from(checkboxes).map((checkbox) => checkbox.id.split("-")[1]);

    if (selectedIds.length === 0) {
      alert("Veuillez sélectionner au moins une annonce à supprimer.");
      return;
    }

    const separator = ",";
    const url = `/api/delete?ids=${selectedIds.join(separator)}`;
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression des annonces");
    }
  };

  if (status === "loading" || loading) return <p>Chargement...</p>;

  return (
    <main>
      <h1>{title}</h1>
      <div className={styles.boutons}>
        <button className={styles.acceuil} onClick={() => router.push("/")}>
          Accueil
        </button>
        <button className={styles.upload} onClick={() => router.push("/upload")}>
          Ajouter une annonce
        </button>
        <button className={styles.delete} onClick={deleteSelected}>
          Supprimer les annonces sélectionnées
        </button>
        <button
          className={styles.deconnection}
          onClick={() => signOut({ callbackUrl: "/connection" })}
        >
          Se déconnecter
        </button>
      </div>

      {annonces.length > 0 ? (
        <div className={styles.annonces}>
          {annonces.map((annonce) => (
            <div key={annonce.id} className={styles.annonceWrapper}>
              <input
                type="checkbox"
                id={`checkbox-${annonce.id}`}
                className={styles.annonceCheckbox}
              />
              <button
                className={styles.annonce}
                onClick={() => router.push(`/annonce/details?id=${annonce.id}`)}
              >
                <h2>{annonce.titre}</h2>
                <p>Date de mise en ligne : {annonce.date}</p>
                <p>Adresse : {annonce.adresse}</p>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune annonce disponible pour le moment.</p>
      )}
    </main>
  );
};

export default Dashboard;