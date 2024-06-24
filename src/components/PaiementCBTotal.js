// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/PaiementCB&TR.css'

/* ===== DEFINITION COMPOSANT PaiementCBTotal ===== */
/* Affichage de la validation du paiement par CB    */
/* et renvoi à la page d'accueil                    */
function PaiementCBTotal(){
   return(
      <div className="paiement-bancaire"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-check"></i> 
         <h3>Paiement CB confirmé</h3> {/* Titre indiquant que le paiement par CB est confirmé */}
         <p className="merci">Merci beaucoup pour votre achat.</p>
         <div className='bouton'>
            <Link to='/' >Retour Menu</Link> {/* Bouton pour retourner au menu principal */}
         </div>
      </div>
   );
}

// Exportation du composant PaiementCBTotal pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementCBTotal;
