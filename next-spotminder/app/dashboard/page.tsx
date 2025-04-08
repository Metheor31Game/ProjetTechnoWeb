// components/Dashboard.tsx
"use client";

import { useRouter } from 'next/navigation';
import styles from '../styles/dashboard.module.css';

interface Annonce {
  id: string;
  titre: string;
  date: string;
  adresse: string;
}

interface DashboardProps {
  title: string;
  annonces?: Annonce[]; // Made optional with `?`
}

const Dashboard: React.FC<DashboardProps> = ({ title, annonces = [] }) => { // Default to empty array
  const router = useRouter();

  const deleteSelected = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".annonce-checkbox:checked");
    const selectedIds = Array.from(checkboxes).map(checkbox => checkbox.id.split("-")[1]);

    if (selectedIds.length === 0) {
      alert("Veuillez sélectionner au moins une annonce à supprimer.");
      return;
    }

    const separator = ",";
    const url = `/delete?ids=${selectedIds.join(separator)}`;
    router.push(url);
  };

  return (
    <main>
      <h1>{title}</h1>
        <div className={styles.boutons}>
        <button className={styles.acceuil} onClick={() => router.push('/')}>
          Accueil
        </button>
        <button className={styles.upload} onClick={() => router.push('/upload')}>
          Ajouter une annonce
        </button>
        <button className={styles.delete} onClick={deleteSelected}>
          Supprimer les annonces sélectionnées
        </button>
        <button className={styles.deconnection} onClick={() => router.push('/logout')}>
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