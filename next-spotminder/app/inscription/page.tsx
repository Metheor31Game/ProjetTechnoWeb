import Link from 'next/link';

export default function Inscription() {
  return (
    <main>
      <h2>Inscription</h2>

      <form action="/inscription" method="post" className="registration-form">
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
              type="text"
              id="nom"
              name="nom"
              placeholder="Entrez votre nom"
              required
            />
          </li>
          <li>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Entrez votre prénom"
              required
            />
          </li>
          <li>
            <input
              type="email"
              id="mail"
              name="mail"
              placeholder="Entrez votre email"
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
        <button type="submit">S'inscrire</button>
      </form>

      {/* Lien vers la page de connexion */}
      <div className="connection-link">
        <label htmlFor="connection">Déjà un compte ?</label>
        <Link href="/connection">
          <button id="connection">Se connecter</button>
        </Link>
      </div>
    </main>
  );
}
