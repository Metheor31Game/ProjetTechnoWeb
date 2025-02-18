// {annonces.length ? (
//     <div class="annonces">
//       {annonces.map(annonce => (
//         <div class="annonce-wrapper">
//         <input type="checkbox" id="checkbox-{{this.id}}" class="annonce-checkbox">
//         <button class="annonce" id="annonce-{{@index}}" onclick="location.href='/annonce/details?id={{this.id}}'">
//           <h2>{{this.titre}}</h2>
//           <p>Date de mise en ligne : {{this.date}}</p>
//           <p>Adresse : {{this.adresse}}</p>
//         </button>
//       </div>
//       ))}
//     </div>
//   ) : (
//     <p>Aucune annonce disponible pour le moment.</p>
//   )}

import Head from 'next/head';
import Link from 'next/link';

export default function dashboard() {
    return (
        <div className="boutons">
            <Link href={"/"}>
                <button className="acceuil" id="acceuil"> Acceuil</button>
            </Link>
            <Link href={"/upload"}>
                <button className="acceuil" id="acceuil"> Ajouter</button>
            </Link>
            
            <button className="delete" id="delete"> Supprimer</button>
            
            <Link href={"/"}>
                <button className="deconnection" id="deconnection"> Deconnection</button>
            </Link>
        </div>
    );
}