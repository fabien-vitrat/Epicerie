// Importation des blibliothéques
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Importation des données de l'argent
import { ArgentsListe } from '../datas/ArgentsListe';

// Importation feuille de styles
import '../styles/PaiementESP.css';

/* ===== DEFINITION COMPOSANT PaiementESP ===== */
/* Saisie de la monnaie donnée par le client    */
/* Rendu de l'argent en fonction de la caisse   */
/* Mise à jour de la caisse avec l'argent donné */
function PaiementESP({ restePayer, caisse, majCaisse, PaiemESP, majPaiemESP, ArgentARendre, majArgentARendre }) {
  // Utilisation de useNavigate pour la navigation entre les pages
  const navigate = useNavigate();

  // Déclaration variable copie caisse
  const [CaisseCopie, majCaisseCopie] = useState([...caisse]);

  //Calcul de la valeur total du paiement en Espece
  const valeurPaiement = PaiemESP.reduce(
    (acc, argentType) => acc + argentType.quantite * argentType.valeur,
    0
  );

  // Fonction pour ajouter de l'argent au paiement en espece (MàJ donnée PaiemESP)
  function AjoutPaiement(nom, valeur) { 
    // Recherche si la monnaie ajouter est déja dans la liste du paiement et création variable paiementAjouter
    const paiementAjouter = PaiemESP.find((argent) => argent.nom === nom);

    if (paiementAjouter) { // Si monnaie déjà dans la liste
      
      // création varaible avec toutes les monnaie sauf celle que j'ajoute
      const fichepaiementAjouter = PaiemESP.filter((argent) => argent.nom !== nom);

      // Mise à jour de ma liste de paiement avec toutes les monnaies (sauf celle qu'on ajoute) = fichepaiementAjouter
      // auquel on rajoute la monnaie ajoutée (paiementAjouter) avec la quantité + 1
      majPaiemESP([...fichepaiementAjouter, { nom, valeur, quantite: paiementAjouter.quantite + 1 }]);
    } else { // Si monnaie n'est pas dans la liste

      // Mise à jour de ma liste de paiement avec toutes les monnaies = PaiemESP
      // auquel on rajoute la monnaie ajoutée avec la quantité 1
      majPaiemESP([...PaiemESP, { nom, valeur, quantite: 1 }]);
    }
  }

  // Fonction pour supprimer de l'argent au paiement en espece (MàJ donnée PaiemESP)
  function SupPaiement(nom, valeur) {
    // Recherche si la monnaie diminuée est déja dans la liste du paiement et création variable paiementSup
    const paiementSup = PaiemESP.find((argent) => argent.nom === nom);

    if (paiementSup) { // Si monnaie déjà dans la liste
      
      // création varaible avec toutes les monnaie sauf celle que je diminue
      const fichepaiementSup = PaiemESP.filter((argent) => argent.nom !== nom);
      
      if (paiementSup.quantite > 1) {  // Si la quantité de l'article est supérieure à 1
        
        // Mise à jour de ma liste de paiement avec toutes les monnaies (sauf celui qu'on diminue) = fichepaiementSup
        // auquel on rajoute la monnaie diminuée (paiementSup) avec la quantité - 1
        majPaiemESP([...fichepaiementSup, { nom, valeur, quantite: paiementSup.quantite - 1 }]);
      
      } else {// Si la quantité de l'article est égale à 1
        // Mise à jour de ma liste de paiement avec toutes les articles (sauf celui qu'on diminue)
        majPaiemESP(PaiemESP.filter(paie => paie.nom !== paiementSup.nom));
      }
    }
  }

  // Fonction qui met à jour la caisse avec l'argent donné par le client
  function majArgentCaisse() {
    for (let i = 0; i < PaiemESP.length; i++) {
      let fichebpC = caisse.findIndex(bpC => bpC.nom === PaiemESP[i].nom); // Recherche monnaie dans la caisse
      if (fichebpC !== -1) { // Si la monnaie est déjà dans la caisse
        caisse[fichebpC].quantite += PaiemESP[i].quantite; // Ajout de la quantité donnée par le client
      } else { // Si la monnaie n'est pas dans la caisse
        caisse.push({ nom: PaiemESP[i].nom, valeur: PaiemESP[i].valeur, quantite: PaiemESP[i].quantite }); // Ajout de la monnaie dans la caisse
      };
    };
    majCaisse([...caisse]); // Mise à jour de l'état de la caisse
  }

  // Fonction qui gère la validation du paiement en Espèce
  function validationESP() {
    // Calcul de la différence entre la somme à payer et la somme versée en espèce
    let sommeRetour = (valeurPaiement - restePayer).toFixed(2);

    // Si somme exacte versée
    if (sommeRetour == 0.00) {
      majArgentCaisse();
      navigate('/PaiementESPTotal'); // Affichage page validation Paiement Espèce

      // Si somme versée n'est pas suffisante
    } else if (sommeRetour < 0) {
      navigate('/PaiementESPMq'); // Affichage page Paiement insuffisant => Manque Espèce

      // Calcul de la monnaie à rendre
    } else {
      majCaisseCopie([...caisse]); // Initialisation de la copie de la caisse
      const CaisseTriee = [...CaisseCopie].sort((a, b) => b.valeur - a.valeur); // Tri de la caisse par ordre décroissant des valeurs

      CaisseTriee.forEach(bi_pi => { // Pour chaque monnaie de la caisse
        while (sommeRetour >= bi_pi.valeur && bi_pi.quantite > 0) { // Vérifie inférieur à somme à rendre
          // Mise à jour de la somme à rendre
          sommeRetour = (sommeRetour - bi_pi.valeur).toFixed(2);

          // Mise à jour de la quantité dans la copie de la caisse
          bi_pi.quantite--;

          // Mise à jour liste argent à rendre
          let fichebpR = ArgentARendre.findIndex(bpR => bpR.nom === bi_pi.nom); // Recherche monnaie dans la caisse
          if (fichebpR !== -1) { // Si la monnaie est déjà dans la caisse
            ArgentARendre[fichebpR].quantite += 1; // Ajout de la quantité donnée par le client
          } else { // Si la monnaie n'est pas dans la caisse
            ArgentARendre.push({ nom: bi_pi.nom, valeur: bi_pi.valeur, quantite: 1 }); // Ajout de la monnaie dans la caisse
          };
          majArgentARendre([...ArgentARendre]);
        }
      });

      if (sommeRetour > 0) {
        navigate('/PaiementESPCV'); // Renvoie vers la page Paiement Caisse vide
      } else {
        majCaisse([...CaisseCopie]);
        majArgentCaisse();
        navigate('/PaiementESPARendre'); // Renvoie vers la page Paiement ESPECE à rendre 
      }
    }
  }

  // Rendu du composant Paiement ESPECE
  return (
    <div className='paiementESP'>
      <h2>
        Montant à payer : {restePayer.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        <br />
        Total payé : {valeurPaiement.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
      </h2>
      <div className='valid_ESP'>
        Saisissez l'argent donné par le client :
        {/* Bouton pour valider le paiement espèce */}
        <button onClick={validationESP}>Valider paiement ESPECE</button>
        <button onClick={() => majPaiemESP([])}>Vider le paiement ESPECE</button>
      </div>

      <div className='argent_client'>
        <table>
          <thead>
            <tr>
              <th className=''>Espèce</th>
              <th className=''>Quantité</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ArgentsListe
              .filter(({ type }) => type === 'piece')
              .map(({ nom, valeur, image }, ind_pi) => (
                <tr key={ind_pi}>
                  <th className='argent_client_piece'>
                    <img src={image} alt={`${nom} cover`} />
                  </th>
                  <td className='argent_client_quantite'>
                    {PaiemESP.find(argent => argent.nom === nom)?.quantite || 0}
                  </td>
                  <td>
                    <button onClick={() => AjoutPaiement(nom, valeur)} className='btn'><i className="fa-solid fa-circle-plus"></i></button>
                    <button onClick={() => SupPaiement(nom, valeur)} className='btn'><i className="fas fa-minus-circle"></i></button>
                  </td>
                </tr>
              ))}
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
            {ArgentsListe
              .filter(({ type }) => type === 'billet')
              .map(({ nom, valeur, image }, ind_bi) => (
                <tr key={ind_bi}>
                  <th className='argent_client_billet'>
                    <img src={image} alt={`${nom} cover`} />
                  </th>
                  <td className='argent_client_quantite'>
                    {PaiemESP.find(argent => argent.nom === nom)?.quantite || 0}
                  </td>
                  <td>
                    <button onClick={() => AjoutPaiement(nom, valeur)} className='btn'><i className="fa-solid fa-circle-plus"></i></button>
                    <button onClick={() => SupPaiement(nom, valeur)} className='btn'><i className="fas fa-minus-circle"></i></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaiementESP;
