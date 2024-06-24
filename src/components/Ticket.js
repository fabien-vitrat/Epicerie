// Importation du module React et du composant Link de react-router-dom pour la navigation
import React from "react";
import { Link } from 'react-router-dom'

// Importation des composants Navbar et Footer
import Navbar from "./Navbar";
import Footer from "./Footer";

// Importation de la feuille de styles pour ce composant
import '../styles/Ticket.css'

/* ===== DEFINITION COMPOSANT Ticket ===== */
/* Affichage des articles du tickets       */
/* classé par catéorie                     */
function Ticket({ ticket, total, totalTR }) {
  // Calcul du nombre d'articles contenus dans le ticket
  const nbArt = ticket.reduce(
    (acc, articlesType) => acc + articlesType.quantite,
    0
  )

  // Création d'une variable contenant les différentes catégories des produits du ticket
  const cat_ticket = ticket.reduce(
    (acc, elem) =>
        acc.includes(elem.categorie) ? acc : acc.concat(elem.categorie),
    []
  )

  return (
    <div>
      {/* Affichage de la barre de navigation */}
      <Navbar />

      {/* Affichage des articles du ticket par catégorie */}
      <div>  
        {ticket.length > 0 ? (
          <div className='ticket-final'>
            <div >
              {/* Affichage du titre et du code-barre */}
              <div className='ticket'>  
                <p className="mon-ticket">Mon ticket</p>
                <h1>Epicerie Cartajima</h1>
                <p className="code-barre">|<strong>|</strong><strong>|</strong><strong>|</strong><strong>|</strong>|||<strong>|</strong>||||<strong>|</strong>|||||<strong>|</strong>||<strong>|</strong>|||||</p>
              </div>

              {/* Gestion de l'affichage des catégories des articles */}
              {cat_ticket
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
              .map((cat , ind_c) => 
                (
                  <div key={ind_c} className=''>
                    <h2>&gt;&gt; {cat}</h2>
                    {/* Gestion de l'affichage des articles pour la catégorie en cours */}
                    {ticket
                    .sort((a, b) => a.nom.toLowerCase().localeCompare(b.nom.toLowerCase()))
                    .map(({ categorie, nom, prix, TR, quantite }, ind_t) => 
                      quantite > 0 && cat === categorie ? (
                        <div key={ind_t}>
                          <div className='produit-cat'>
                            <p className="nom">{TR} {nom}</p>
                            <p className="prix">{Intl.NumberFormat("fr-FR").format(quantite*prix)}&nbsp;€</p>
                          </div>
                          {/* Ajout d'une ligne avec quantité et prix unitaire si quantité > 1 */}
                          {quantite > 1 &&
                          <p className="quantite">{quantite} x {Intl.NumberFormat("fr-FR").format(prix)}&nbsp;€</p>}
                        </div>
                      ):null)}
                  </div>
                )
              )}

              <div>
                {/* Gestion de l'affichage du nombre d'articles et du montant TOTAL du ticket */}
                <div className='produit-cat ticket-total'>
                  <p className="titre">Total <small>({nbArt} articles)</small></p>
                  <p className="prix-total">{Intl.NumberFormat("fr-FR").format(total)}&nbsp;€</p>
                </div>
                {/* Gestion de l'affichage du montant éligible aux TR si différent de 0,00 € */}
                { totalTR > 0 &&
                  <p className="info-ticket-restau">
                    Montant éligible aux tickets restaurants : {Intl.NumberFormat("fr-FR").format(totalTR)}&nbsp;€
                    <br/>
                    * Achats compatibles aux tickets restaurants.
                  </p> 
                }              
                <p className="merci">Merci d'avoir acheté chez nous.</p>
              </div>
              <div className='affichage-paiement'>
              {/* Affichage bouton pour afficher la page de paiement */}
              <Link to='/Paiement' >Affichage Paiement</Link>      
              </div>
            </div>
          </div>
        ) : (
            /* Gestion de l'affichage si le ticket est vide */
            <div className="ticket_erreur"> {/* Conteneur principal */}
              <i className="fa-solid fa-circle-exclamation"></i>
              <h3>Votre ticket est vide!</h3> {/* Titre indiquant que le panier est vide */}
              <p className="merci">Vous ne pouvez pas afficher votre ticket.</p>
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

// Exportation du composant Ticket pour pouvoir l'utiliser dans d'autres fichiers
export default Ticket;
