import Link from 'next/link';

export default function AjouterAnnonce() {
  return (
    <main>
      <div className="boutons">
        {/* Bouton de retour au dashboard */}
        <Link href="/dashboard">
          <button className="retour_dashboard" id="retour_dashboard">
            Retour au dashboard
          </button>
        </Link>
      </div>

      {/* Formulaire pour ajouter une annonce */}
      <form action="/upload" method="post">
        <ul>
          <li>
            <input
              type="text"
              id="titre"
              name="titre"
              placeholder="Titre de l'annonce"
              required
            />
          </li>
          <li>
            <input
              type="text"
              id="adresse"
              name="adresse"
              placeholder="Adresse du bien"
              required
            />
          </li>
          <li>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description de l'annonce ..."
            />
          </li>
          <li>
            <input
              type="text"
              id="lien"
              name="lien"
              placeholder="www.le_lien_de_lannonce.com"
            />
          </li>
        </ul>
        <button type="submit">Ajouter une annonce</button>
      </form>
    </main>
  );
}
