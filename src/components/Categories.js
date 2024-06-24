// Importation de la feuille de styles pour ce composant
import '../styles/Categories.css'

/* ===== DEFINITION COMPOSANT CATEGORIES ===== */
/* Affichage des différentes categories        */
/* Et de la barre de filtrage                  */
function Categories({ setActiveCategory, categories, activeCategory }) {
    return (
        <div className='categories'> {/* Conteneur des catégories */}
            <p>Filtrer par : </p> {/* Libellé pour le filtre par catégorie */}
            <select
                value={activeCategory} // Valeur sélectionnée dans la liste déroulante
                onChange={(e) => setActiveCategory(e.target.value)} // Gestionnaire d'événements pour la modification de la catégorie active
                className='categories-select' // Classe CSS pour le sélecteur de catégories
            >
                <option value=''>---</option> {/* Option par défaut pour réinitialiser le filtre */}
                {/* Mapping sur les catégories disponibles et création d'une option pour chacune */}
                {categories.map((cat,ind_c) => (
                    <option key={ind_c} value={cat}> {/* Clé unique pour chaque option */}
                        {cat} {/* Nom de la catégorie */}
                    </option>
                ))}
            </select>
            {/* Bouton pour réinitialiser le filtre */}
            <button onClick={() => setActiveCategory('')}><i className="fa-solid fa-rotate-left"></i></button>
        </div>
    )
}

// Exportation du composant Categories pour pouvoir l'utiliser dans d'autres fichiers
export default Categories
