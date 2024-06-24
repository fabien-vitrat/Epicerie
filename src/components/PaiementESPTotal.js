// Importation du composant useNavigate de react-router-dom pour la navigation
import { useNavigate } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/PaiementESP.css'

/* ===== DEFINITION COMPOSANT PaiementESPTotal ===== */
/* Affichage de la validation du paiement par ESPECE */
/* et renvoi à la page d'accueil                     */
function PaiementESPTotal({majTicket, majPaiemESP, majArgentARendre}){
   // Utilisation de useNavigate pour la navigation entre les pages
  const navigate = useNavigate();
   function InitRetour(){
      majTicket([]); // Remise à zéro du ticket
      majPaiemESP([]); // Remise à zéro du paiement espèce
      majArgentARendre([]); // Remise à zéro de l'argent à rendre
      navigate('/');
   }
   
   return(
      <div className="paiement-ESP"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-check"></i>
         <h3>Paiement ESPECE confirmé</h3> {/* Titre indiquant que le paiement par ESPECE est confirmé */}
         <p className="merci">Merci beaucoup pour votre achat.</p>
         <div className='bouton'>
            <button onClick={() => InitRetour()}>Retour Menu</button> {/* Bouton pour initialisation des données et retourner au menu principal */}
         </div>
      </div>
   );
}

// Exportation du composant PaiementESPTotal pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementESPTotal;