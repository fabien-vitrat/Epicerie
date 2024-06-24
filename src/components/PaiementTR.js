// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/PaiementCB&TR.css'

/* ===== DEFINITION COMPOSANT PaiementTR ===== */
/* Affichage de la validation du paiement      */
/* par TR et renvoi à la page de paiement      */
/* pour le solde                               */
function PaiementTR(){
   return(
      <div className="paiement-bancaire"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-check"></i>
         <h3>Paiement TR confirmé</h3> {/* Titre indiquant que le paiement par TR est confirmé */}
         <p className="merci">Merci beaucoup pour votre paiement TR.</p>
         <div className='bouton'> 
            <Link to='/Paiement' >Retour Paiement</Link> {/* Bouton pour retourner à la page de paiement */}
         </div>   
      </div>
   );
}

// Exportation du composant PaiementCB pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementTR;
