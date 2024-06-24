// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/PaiementESP.css'

/* ===== DEFINITION COMPOSANT PaiementESPMq ===== */
/* Affichage du manque d'argent donné             */
/* et renvoi à la page de paiement                */
function PaiementESPMq(){
   return(
      <div className="paiement-ESPInsuf"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-exclamation"></i>
         <h3>Vous n'avez pas donné assez d'espèces</h3> {/* Titre indiquant que le paiement n'est pas suffisant */}
         <p className="merci">Merci de completer votre paiement</p>
         <div className='bouton'>
            <Link to='/PaiementESP' >Retour Paiement Espèce</Link> {/* Bouton pour retourner à la page de paiement */}
         </div>   
      </div>
   );
}

// Exportation du composant PaiementCB pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementESPMq;
