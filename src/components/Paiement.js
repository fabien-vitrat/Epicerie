// Importation des bibliothèques React et useState pour gérer l'état dans les composants fonctionnels, ainsi que useNavigate pour la navigation
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Importation des composants Navbar et Footer
import Navbar from "./Navbar";
import Footer from "./Footer";

// Importation des images pour les moyens de paiement
import CB from '../assets/CB.png'
import TR from '../assets/tr.png'
import ESP from '../assets/ESPECE.webp'

// Importation de la feuille de styles CSS
import '../styles/Paiement.css'

/* ===== DEFINITION COMPOSANT Paiement ===== */
/* Affichage des différentes possibilité     */
/* de paiement et gestion du paiement        */
function Paiement({ ticket, majTicket, total, restePayer, majrestePayer, restePayerTR, majrestePayerTR }) {
  // Utilisation de useNavigate pour la navigation entre les pages
  const navigate = useNavigate()

  // Utilisation de useState pour gérer l'état des montants payés par les différents moyens de paiement
  const [valeurPaieTR, majvaleurPaieTR] = useState(restePayerTR)
  const [valeurPaieCB, majvaleurPaieCB] = useState(restePayer)

  // Fonction pour afficher la zone de saisie du montant payé pour un moyen de paiement spécifique
  function clicPaiement(element, el1, el2){
    var maDiv = document.getElementById('paiement');
		var maDiv0 = document.getElementById(element);
    var maDiv1 = document.getElementById(el1);
    maDiv.style.display = "block";
    maDiv0.style.display = "block";
    maDiv1.style.display = "none";
	}

  // Fonction pour valider le paiement par Ticket Restaurant
  function validTR(){
    //Si paiement en TR supérieur à 0
    if (valeurPaieTR > 0) {
      //Si paiement en TR inférieur au reste à payer en TR
      if (valeurPaieTR <= restePayerTR) {
        //Si paiement en TR solde l'achat
        if (restePayer === valeurPaieTR){
          majTicket([]); // Remise à zéro du ticket
          navigate('../PaiementTRTotal'); // Renvoie vers la page Paiement TR TOTAL
    
        } else { //Si paiement en TR ne solde pas l'achat
          //Mise à jour du montant TOTAL restant à payer
          majrestePayer(restePayer-valeurPaieTR); 
          
          //Mise à jour du montant autoriser en TR restant à payer
          if((restePayerTR-valeurPaieTR) > (restePayer-valeurPaieTR)){
            majrestePayerTR(restePayer-valeurPaieTR)
          } else {
            majrestePayerTR(restePayerTR-valeurPaieTR)
          }
          navigate('../PaiementTR');  // Renvoie vers la page Paiement TR 
        }
      } else { //Message d'erreur si paiement en TR supérieur au reste à payer en TR
        alert('Vous avez dépassé la somme autorisée pour le paiement en TR !');
      }
    } else { //Message d'erreur si paiement en TR inférieur à 0
      alert('Vous avez saisie une valeur négative !!!');
    }
    
  }

  // Fonction pour valider le paiement par carte bancaire
  function validCB(){
    //Si paiement en CB supérieur à 0
    if (valeurPaieCB > 0) {
      //Si paiement en TR inférieur au reste à payer en TR
      if (valeurPaieCB <= restePayer) {
        //Si paiement en CB solde l'achat
        if (restePayer === valeurPaieCB){
          majTicket([]); // Remise à zéro du ticket
          navigate('../PaiementCBTotal'); // Renvoie vers la page Paiement CB TOTAL

        } else {//Si paiement en CB ne solde pas l'achat
          //Mise à jour du montant TOTAL restant à payer
          majrestePayer(restePayer-valeurPaieCB);

          //Mise à jour du montant autoriser en TR restant à payer
          if(restePayerTR > (restePayer-valeurPaieCB)){majrestePayerTR(restePayer-valeurPaieCB)}

          navigate('../PaiementCB');  // Renvoie vers la page Paiement CB
        }
      } else { //Message d'erreur si paiement en CB supérieur au reste à payer
        alert('Vous avez dépassé la somme restant à payer !');
      }
    } else { //Message d'erreur si paiement en CB inférieur à 0
      alert('Vous avez saisie une valeur négative !!!');
    }
  }

  // Rendu du composant Paiement
  return (
    <div>
      {/* Affichage de la barre de navigation */}
      <Navbar />

      <div>  
        {ticket.length > 0 ? (
          <div className='paiement'>
            <h1> {/* Affichage du montant total des achats */}
              Montant des achats : {total.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
            </h1>
            <h2> {/* Affichage du montant reste à payer */}
              Reste à payer : {restePayer.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
            </h2>
            <h2> {/* Affichage du montant eligible au TR */}
              Somme éligible au TR : {restePayerTR.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
            </h2>
            {/* Sélection du mode de paiement */}
            <div className="paieChoix">
              <p className="paie_choix">Choisir le mode de paiement : </p>
              <div className='paie_type'>
                {/* Boutons pour sélectionner le paiement par Ticket Restaurant, carte bancaire ou espèces */}
                <button onClick={() => clicPaiement('paiementTR','paiementCB')} >
                  <img src={TR} alt="TR"/>
                </button>
                <button onClick={() => clicPaiement('paiementCB','paiementTR')} >
                  <img src={CB} alt="CB"/>
                </button>
                <button onClick={() => navigate('/PaiementESP')} >
                  <img src={ESP} alt="ESP"/>
                </button>
              </div> 
            </div>
            
            {/* Affichage de la zone de saisie du montant du paiement */}
            <div id="paiement" className="paieValeur">
              {/* Zone de saisie du montant du paiement par Ticket Restaurant */}
              <div id="paiementTR" className="valPaieTR">
                <div>
                  Somme payée en TR : 
                  <input 
                    type = 'text'
                    name = "valpaiementTR"
                    defaultValue={Intl.NumberFormat("fr-FR").format(restePayerTR)} 
                    onChange={(event) => majvaleurPaieTR((event.target.value).replace(",","."))}>
                  </input>
                  €
                </div>
                {/* Bouton pour valider le paiement par Ticket Restaurant */}
                <button onClick={() => validTR()} className='btn'>Valider paiement TR</button>
              </div>

              {/* Zone de saisie du montant du paiement par carte bancaire */}
              <div id="paiementCB" className="valPaieCB">
                <div>
                  Somme payée en CB : 
                  <input 
                    type = "text"
                    name = "valpaiementCB"
                    defaultValue={Intl.NumberFormat("fr-FR").format(restePayer)}
                    onChange={(event) => majvaleurPaieCB((event.target.value).replace(",","."))}>
                  </input>
                  €
                </div>
                {/* Bouton pour valider le paiement par carte bancaire */}
                <button onClick={() => validCB()} className='btn'>Valider paiement CB</button>
              </div>
            </div> 
          </div>
        ) : (
            /* Gestion de l'affichage si le ticket est vide */
            <div className="paiement_erreur"> {/* Conteneur principal */}
              <i className="fa-solid fa-circle-exclamation"></i>
              <h3>Votre ticket est vide!</h3> {/* Titre indiquant que le panier est vide */}
              <p className="merci">Vous ne pouvez pas effectuer de paiement.</p>
              <div className='bouton'> 
                  <Link to='/Achat' >Retour Achat</Link> {/* Bouton pour retourner à la page d'Achat */}
              </div>   
            </div>
        )}

      </div>
      
      {/* Affichage du pied de page */}
      <Footer />
    </div>
  );
}

// Exportation du composant Paiement pour pouvoir l'utiliser dans d'autres fichiers
export default Paiement;
