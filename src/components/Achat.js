//Importation des blibliothéques
import React from "react";

// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

//Importation des composants
import Navbar from "./Navbar";
import Footer from "./Footer";
import TicketArticles from './TicketArticles';
import ListeArticles from './ListeArticles';

// Importation des styles pour ce composant
import '../styles/Achat.css'

/* ===== DEFINITION COMPOSANT Achat ===== */
/* Affichage du ticket et choix articles  */
function Achat({ ticket, majTicket, total, restePayer}) {
  
  return (
    <div>
      {/* Affichage de la barre de navigation */}
      <Navbar />

      {/* Gestion affichage de la page si pas de paiement effectué */}
      {total === restePayer ?(
      <>
        {/* Gestion affichage la zone ticket (2 derniers articles uniquement) */}
        <section className='main'>
          <div className='col_ticket'>
            <TicketArticles ticket={ticket} majTicket={majTicket} total={total} />
          </div>
        </section>
        
        {/* Gestion affichage de la liste des articles */}
        <section className='main'>
          <div className='col_art'>
            <ListeArticles ticket={ticket} majTicket={majTicket} />
          </div>
        </section>
      </>
      ):(
        // Gestion affichage de la page d'erreur si paiement effectué
        <div className="achat_erreur"> {/* Conteneur principal */}
         <i className="fa-solid fa-circle-exclamation"></i>
         <h3>Vous avez déjà commencé à payer!</h3> {/* Titre indiquant qu'une partie du paiement est faites */}
         <p className="merci">Vous ne pouvez pas continuer vos achats.</p>
         <div className='bouton'> 
            <Link to='/Paiement' >Retour Paiement</Link> {/* Bouton pour retourner à la page de paiement */}
         </div>   
        </div>
      )
    }
      
      {/* Affichage du pied de page */}
      <Footer />
    </div>
  );
}

export default Achat;