// Importation du fichier de styles pour cet élément d'article
import '../styles/ArticleItem.css'

// Définition du composant ArticleItem, qui affiche les détails d'un article
function ArticleItem({ image, nom, prix }) {
    return (
        // Élément de liste représentant un article
        <li className='article-item'>
            {/* Affichage du prix de l'article */}
            <span className='article-item-prix'>{prix}€</span>
            {/* Affichage de l'image de l'article avec un texte alternatif */}
            <img className='article-item-image' src={image} alt={`${nom} cover`} />
            {/* Affichage du nom de l'article */}
            <p>{nom}</p>
        </li>
    )
}

// Exportation du composant ArticleItem pour pouvoir l'utiliser dans d'autres fichiers
export default ArticleItem
