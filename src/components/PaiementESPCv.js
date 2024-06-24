// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/PaiementESP.css'

/* ===== DEFINITION COMPOSANT PaiementESPCV ===== */
/* Affichage du manque d'argent en caisse         */
/* et renvoi à la page de paiement                */
function PaiementESPCV(){
   return(
      <div className="paiement-ESPInsuf"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-exclamation"></i>
         <h3>Nous n'avons pas assez d'argent en caisse</h3> {/* Titre indiquant que la caisse n'est pas suffisante */}
         <p className="merci">Merci de faire l'appoint</p>
         <div className='bouton'>
            <Link to='/PaiementESP' >Retour Paiement Espèce</Link> {/* Bouton pour retourner à la page de paiement */}
         </div>   
      </div>
   );
}

// Exportation du composant PaiementCB pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementESPCV;
