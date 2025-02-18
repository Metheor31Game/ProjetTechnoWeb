import Link from 'next/link';

        
export default function Connexion() {
    return (
    <div className="connexion-container">
      {/* Boutons de navigation */}
      <div className="boutons">
        <Link href="/">
          <button className="acceuil" id="acceuil">
            Accueil
          </button>
        </Link>
      </div>

      {/* Titre de la page */}
      <h2>Connexion</h2>

      {/* Formulaire de connexion */}
      <form action="/connection" method="post">
        <ul>
          <li>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              placeholder="Entrez votre pseudo"
              required
            />
          </li>
          <li>
            <input
              type="password"
              id="mdp"
              name="mdp"
              placeholder="Entrez votre mot de passe"
              required
            />
          </li>
        </ul>
        <button className='button connection' type="submit">Se connecter</button>
      </form>

      {/* Lien vers la page d'inscription */}
      <div className="inscription-link">
        <h2>Pas de compte ?</h2>
        <Link href="/inscription">
            <button className="button inscription">S'inscrire</button>
        </Link>
      </div>
    </div>
  );
}
