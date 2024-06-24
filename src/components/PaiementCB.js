// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/PaiementCB&TR.css'

/* ===== DEFINITION COMPOSANT PaiementCB ===== */
/* Affichage de la validation du paiement      */
/* par CB et renvoi à la page de paiement      */
/* pour le solde                               */
function PaiementCB(){
   return(
      <div className="paiement-bancaire"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-check"></i>
         <h3>Paiement CB confirmé</h3> {/* Titre indiquant que le paiement par CB est confirmé */}
         <p className="merci">Merci beaucoup pour votre paiement CB.</p>
         <div className='bouton'>
            <Link to='/Paiement' >Retour Paiement</Link> {/* Bouton pour retourner à la page de paiement */}
         </div>   
      </div>
   );
}

// Exportation du composant PaiementCB pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementCB;
