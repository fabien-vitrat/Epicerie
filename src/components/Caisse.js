//Importation des blibliothéques
import React, { useState } from 'react';

//Importation des composants
import Navbar from "./Navbar";
import Footer from "./Footer";

//Importation des données de l'argent
import { ArgentsListe } from '../datas/ArgentsListe'

//Importation feuille de styles
import '../styles/Caisse.css'

/* ===== DEFINITION COMPOSANT Caisse ===== */
/* Affichage du contenu de la caisse       */
function Caisse({ caisse, majCaisse }) {
  // Déclaration des états : isLocked pour gérer l'état verrouillé/déverrouillé et unlockCode pour stocker le code saisi
  const [isLocked, setIsLocked] = useState(true);
  const [unlockCode, setUnlockCode] = useState('');
  const correctCode = '1234'; // Code correct pour déverrouiller la page

  // Calcul de la valeur totale en caisse
  const valeurCaisse = caisse.reduce(
    (acc, argentType) => acc + argentType.quantite * argentType.valeur,
    0
  )

  // Fonction pour ajouter de l'argent à la caisse
  function AjoutArgent(nom, valeur) {
    // Recherche si la monnaie ajouter est déja dans la caisse et création variable argentAjouter
    const argentAjouter = caisse.find((argent) => argent.nom === nom)
    
    if (argentAjouter) { // Si monnaie déjà en caisse
      // création varaible avec toutes les monnaie sauf celle que j'ajoute
      const ficheArgentAjouter = caisse.filter((argent) => argent.nom !== nom)
      
      // Mise à jour de ma caisse avec toutes les monnaies (sauf celle qu'on ajoute) = ficheArgentAjouter
      // auquel on rajoute la monnaie ajoutée (argentAjouter) avec la quantité + 1
      majCaisse([...ficheArgentAjouter, { nom, valeur, quantite: argentAjouter.quantite + 1 }])

    } else { // Si monnaie n'est pas en caisse
      
      // Mise à jour de ma caisse avec toutes les monnaies = caisse
      // auquel on rajoute la monnaie ajoutée avec la quantité 1
      majCaisse([...caisse, { nom, valeur, quantite: 1 }])
    }
  }

  // Fonction pour supprimer de l'argent de la caisse
  function SupArgent(nom, valeur) {
    // Recherche si la monnaie diminuée est déja dans la caisse et création variable argentAjouter
    const argentSup = caisse.find((argent) => argent.nom === nom)
    
    if (argentSup) { // Si monnaie déjà en caisse
      // création varaible avec toutes les monnaie sauf celle que je diminue
      const ficheArgentSup = caisse.filter((argent) => argent.nom !== nom)

      if(argentSup.quantite > 0) // Si la quantité est supérieur à 0

        // Mise à jour de ma caisse avec toutes les monnaies (sauf celle qu'on diminue) = ficheArgentSup
        // auquel on rajoute la monnaie diminuée (argentSup) avec la quantité - 1
        majCaisse([...ficheArgentSup, { nom, valeur, quantite: argentSup.quantite - 1 }])

    } else { // Si monnaie n'est pas en caisse
      
      // Mise à jour de ma caisse avec toutes les monnaies = caisse
      // auquel on rajoute la monnaie diminuée avec la quantité 0
      majCaisse([...caisse, { nom, valeur, quantite: 0 }])
    }
  }

  // Fonction pour gérer le déverrouillage de la page
  const handleUnlock = () => {
    if (unlockCode === correctCode) {
      setIsLocked(false); // Déverrouiller la page si le code est correct
    } else {
      alert('Code incorrect !');
      setUnlockCode(''); // Réinitialiser le champ de saisie
    }
  };

  return (
    <div>
      {/* Composant Navbar pour la navigation */}
      <Navbar />
      <div>
        {/* Affichage du total en caisse */}
        <h2 className='total'>Total en caisse : {valeurCaisse.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</h2>
      </div>
      {/* Vérification si la page est verrouillée */}
      {isLocked ? (
        <div className='verou'>
          <h3>Veuillez déverrouiller la page :</h3>
          <div className='verou-code'>
            <input
              className='verou-demande'
              type="password"
              value={unlockCode}
              onChange={(e) => setUnlockCode(e.target.value)}
            />
            <button onClick={handleUnlock}>Déverrouiller</button>
          </div>
        </div>
      ) : (   
        <div> {/* Si la page est déverrouillée */}
          {/* Bouton pour vider la caisse */}
          <button onClick={() => majCaisse([])} className='ticket-toggle-button vider-caisse'>Vider la caisse</button>
          <div className='caisse'>
            <table>
              <thead>
                <tr>
                  <th className=''>Espèce</th>
                  <th className=''>Quantité</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Recherche sur la liste des pièces et affichage */}
                {ArgentsListe //Dans la donnée ArgentListe (fichier ArgentListe.js dans dossier datas)
                  .filter(({ type }) => type === 'piece')  //filtre sur le type "piece"
                  .map(({ nom, valeur, image }, ind_pi) => // On passe chaque element de la donnée ArgentListe
                    (
                      <tr key={ind_pi} >
                        <th className='caisse-piece'> {/* On affiche l'image de la piece en cours */}
                          <img src={image} alt={`${nom} cover`} />
                        </th>
                        <td className='quantite-piece'> {/* On affiche la quantité dans la caisse de la piece en cours */}
                          {caisse ?
                            (caisse.find(argent => argent.nom === nom) ?
                              caisse.find(argent => argent.nom === nom).quantite :
                              0) :
                            0}
                        </td>
                        {/* Boutons pour ajouter et supprimer de la pièce */}
                        <td className='caisse-bouton'>
                          <button onClick={() => AjoutArgent(nom, valeur)} className='btn'><i className="fa-solid fa-circle-plus"></i></button>
                          <button onClick={() => SupArgent(nom, valeur)} className='btn'><i className="fas fa-minus-circle"></i></button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th className=''>Billet</th>
                  <th className=''>Quantité</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Recherche sur la liste des billets et affichage */}
                {ArgentsListe //Dans la donnée ArgentListe (fichier ArgentListe.js dans dossier datas)
                  .filter(({ type }) => type === 'billet') //filtre sur le type "billet"
                  .map(({ nom, valeur, image }, ind_bi) => // On passe chaque element de la donnée ArgentListe
                    (
                      <tr key={ind_bi} >
                        <th className='caisse-billet'> {/* On affiche l'image du billet en cours */}
                          <img src={image} alt={`${nom} cover`} />
                        </th>
                        <td className='quantite-billet'> {/* On affiche la quantité dans la caisse du billet en cours */}
                          {caisse ?
                            (caisse.find(argent => argent.nom === nom) ?
                              caisse.find(argent => argent.nom === nom).quantite :
                              0) :
                            0}
                        </td>
                        {/* Boutons pour ajouter et supprimer du billet */}
                        <td className='caisse-bouton'>
                          <button onClick={() => AjoutArgent(nom, valeur)} className='btn'><i className="fa-solid fa-circle-plus"></i></button>
                          <button onClick={() => SupArgent(nom, valeur)} className='btn'><i className="fas fa-minus-circle"></i></button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
          {/* Composant Footer pour le pied de page */}
          <Footer />
        </div>
      )}
    </div>
  );
}

// Exportation du composant Caisse pour pouvoir l'utiliser dans d'autres fichiers
export default Caisse;
