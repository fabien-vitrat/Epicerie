// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom';

//Importation des données de l'argent
import { ArgentsListe } from '../datas/ArgentsListe'

// Importation des styles pour ce composant
import '../styles/PaiementESP.css';



// Définition du composant PaiementCB
function PaiementESPARendre({ArgentARendre, majArgentARendre}){
   console.log('Val argent :',ArgentARendre)
   return(
      <div className="paiement-ESPRendu"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-exclamation"></i>
         <h3>Vous devez rendre</h3>
         <div className='argentRendu'>
            {ArgentARendre
               .sort((a,b) => b.valeur-a.valeur)
               .map(({ nom, quantite }, ind_t) => 
                  (
                  <div key={ind_t}>
                     <div className='detailmonnaie'>
                        <img 
                           src={ArgentsListe.find(monnaie => monnaie.nom === nom).image}
                           alt={`${nom} cover`}
                        />
                        <p className="prix">X {Intl.NumberFormat("fr-FR").format(quantite)}</p>
                     </div>
                  </div>
                  ))}
         </div>
         <div className='bouton'>
            <Link to='/PaiementESPTotal'>Validation Rendu Espèce</Link> {/* Bouton pour retourner à la page de paiement */}
         </div>   
      </div>
      

   );
}

// Exportation du composant PaiementCB pour pouvoir l'utiliser dans d'autres fichiers
export default PaiementESPARendre;
