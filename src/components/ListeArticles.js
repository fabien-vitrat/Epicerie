// Importation du hook useState depuis React pour gérer l'état
import { useState } from 'react'

// Importation de la liste des articles depuis un fichier externe
import { ArticlesListe } from '../datas/ArticlesListe'

// Importation du composant ArticleItem pour afficher chaque article
import ArticleItem from './ArticleItem'

// Importation du composant Categories pour filtrer les articles par catégorie
import Categories from './Categories'

// Importation de la feuille de styles pour ce composant
import '../styles/ListeArticles.css'

/* ===== DEFINITION COMPOSANT ListeArticles ===== */
/* Affichage des différentes articles             */
/* Avec filtre possible sur la catégories         */
function ListeArticles({ ticket, majTicket }) {
    // Déclaration de l'état pour la catégorie active
    const [activeCategory, setActiveCategory] = useState('')

    // Extraction des catégories uniques à partir de la liste des articles
    const categories = ArticlesListe.reduce(
        (acc, elem) =>
            acc.includes(elem.categorie) ? acc : acc.concat(elem.categorie),
        []
    )

    // Fonction pour ajouter un article au ticket
    function AjoutArtTicket(categorie, nom, prix, TR) {
        // Recherche si l'article à ajouter est déja dans le ticket et création variable argentAjouter
        const articleAjouter = ticket.find((article) => article.nom === nom)
        
        if (articleAjouter) { // Si l'article est déjà dans le ticket
            // création varaible avec tous les articles sauf celui que l'on ajoute
            const ficheArticleAjouter = ticket.filter((article) => article.nom !== nom)
            
            // Mise à jour du ticket avec tous les articles (sauf celui qu'on ajoute) = ficheArticleAjouter
            // auquel on rajoute l'article ajouté (articleAjouter) avec la quantité + 1
            majTicket([
                ...ficheArticleAjouter,
                { categorie, nom, prix, TR, quantite: articleAjouter.quantite + 1 }
            ])

        } else { // Si l'article n'est pas dans le ticket

            // Mise à jour du ticket avec tous les articles = ticket
            // auquel on rajoute l'article ajouté avec la quantité 1
            majTicket([...ticket, { categorie, nom, prix, TR, quantite: 1 }])
        }   
    }
    

    // Fonction pour supprimer un article du ticket
    function SupArtTicket(categorie, nom, prix, TR) {
        // Recherche si l'article à ajouter est déja dans le ticket et création variable articleSupprimer
        const articleSupprimer = ticket.find((article) => article.nom === nom)

        if (articleSupprimer) { // Si l'article à supprimer est trouvé dans le ticket
            // création varaible avec tous les articles sauf celui que l'on diminu
            const ficheArticleSupprimer = ticket.filter((article) => article.nom !== nom)

            if (articleSupprimer.quantite > 1) { // Si la quantité de l'article est supérieure à 1
                // Mise à jour du ticket avec toutes les articles (sauf celui qu'on diminue) = ficheArticleSupprimer
                // auquel on rajoute l'article diminuée (articleSupprimer) avec la quantité - 1
                majTicket([ 
                    ...ficheArticleSupprimer,
                    { categorie, nom, prix, TR, quantite: articleSupprimer.quantite - 1 }
                ])
            } else { // Si la quantité de l'article est égale à 1
                // Mise à jour du ticket avec toutes les articles (sauf celui qu'on diminue)
                majTicket(ticket.filter(tick => tick.nom !== articleSupprimer.nom))
            }
        } 
    }
    

    // Rendu du composant ListeArticles
    return (
        <div className='shopping-list'> {/* Conteneur de la liste d'articles */}
            <div className='shopping-categorie'> {/* Conteneur pour le composant Categories */}
                {/* Composant Categories pour filtrer les articles par catégorie */}
                <Categories
                    categories={categories}
                    setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory}
                />
            </div>

            <ul className='article-list'> {/* Liste des articles */}
                {/* Mapping sur la liste des articles et affichage des articles en fonction de la catégorie active */}
                {ArticlesListe.map(({ image, nom, prix, TR, categorie }, ind_ar) =>
                    !activeCategory || activeCategory === categorie ? (
                        <div key={ind_ar} className='article'>
                            {/* Composant ArticleItem pour afficher les détails de l'article */}
                            <ArticleItem
                                image={image}
                                nom={nom}
                                prix={prix}
                            />
                            {/* Bouton pour supprimer un article du ticket */}
                            <button onClick={() => SupArtTicket(categorie, nom, prix, TR)} className='btn'><i className="fa-solid fa-minus"></i></button>
                            {/* Bouton pour ajouter un article au ticket */}
                            <button onClick={() => AjoutArtTicket(categorie, nom, prix, TR)} className='btn'><i className="fa-solid fa-plus"></i></button>
                        </div>
                    ) : null
                )}
            </ul>
        </div>
    )
}

// Exportation du composant ListeArticles pour pouvoir l'utiliser dans d'autres fichiers
export default ListeArticles
