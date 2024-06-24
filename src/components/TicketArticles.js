// Importation du hook useState de React pour gérer l'état local
import { useState } from 'react'

// Importation du composant Link de react-router-dom pour la navigation
import { Link } from 'react-router-dom'

// Importation des styles pour ce composant
import '../styles/TicketArticles.css'

// Définition du composant TicketArticles
function TicketArticles({ ticket, majTicket, total }) {
    // État local pour gérer l'ouverture/fermeture du ticket
    const [isOpen, setIsOpen] = useState(true)
        
    return isOpen ? ( // Si le ticket est ouvert
        <div className='ticket'>
            <button
                className='ticket-toggle-button'
                onClick={() => setIsOpen(false)}
            >
                Fermer la liste des articles
            </button>
            {/* Bouton pour vider le ticket s'il y a des articles */}
            {ticket.length > 0 ? (
                <button onClick={() => majTicket([])} className='ticket-toggle-button'>Vider le ticket</button>
            ):null}

            {/* Si le ticket contient des articles */}
            {ticket.length > 0 ? (
                <div> 
                    <h2>Détails des deux derniers articles ajoutés :</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className='nom'>Produit</th>
                                <th className='prix'>Prix</th>
                                <th className='quantite'>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapping sur les deux derniers articles du ticket */}
                            {ticket
                            .filter(({ id }, index) => index > ticket.length-3 )
                            .map(({ nom, prix, quantite }, index) => 
                                quantite > 0 ?( // Vérification si la quantité est supérieure à zéro
                                    <tr key={`${nom}-${index}`}>
                                        <td className='nom'>{nom}</td>
                                        <td className='prix'>{prix.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</td>
                                        <td className='quantite'>{quantite}</td>
                                    </tr>
                                ):null
                            )}
                        </tbody>
                    </table>

                    {/* Affichage du montant total à payer */}
                    <h3>Total : {total.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</h3>

                    {/* Affichage du bouton pour afficher le ticket complet */}
                    {ticket.length > 0 ? (
                        <Link to='/Ticket' className='affichage-ticket'>Affichage Ticket</Link>
                    ):null}

                </div>
            ) : (
                <div>Votre panier est vide</div> // Si le ticket est vide
            )}
        </div>
    ) : (
        <div className='ticket-closed'> {/* Si le ticket est fermé */}
            <button
                className='ticket-toggle-button'
                onClick={() => setIsOpen(true)}
            >
                Ouvrir le Ticket
            </button>
        </div>
    )
}

// Exportation du composant TicketArticles pour pouvoir l'utiliser dans d'autres fichiers
export default TicketArticles;
