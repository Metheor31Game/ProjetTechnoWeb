import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Spot Minder</title>
        <meta name="description" content="Spot Minder - Simplify your real estate search" />
      </Head>

      <main>
        <div className="container">
          <header>
            <h1 className="title">Spot Minder</h1>
          </header>

          <div className="boutons">
            <Link href="/connection">
              <button className="button connection">Se connecter</button>
            </Link>
            <Link href="/inscription">
              <button className="button inscription">S'inscrire</button>
            </Link>
          </div>

          <section className="solution">
            <h2>Notre Solution :</h2>
            <p>
              Nous concevons une interface simplifiant la vie lors de la recherche d'annonces immobilières.
            </p>
            <a href="#" className="cta">Découvrir nos services</a>
          </section>
        </div>

        <footer>
          <p>© 2024 SpotMinder. Tous droits réservés.</p>
          <p>
            <a href="#">Mentions légales</a> | <a href="#">Politique de confidentialité</a>
          </p>
        </footer>
      </main>
    </>
  );
}
