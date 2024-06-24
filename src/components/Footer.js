// Importation de la feuille de styles pour ce composant
import '../styles/Footer.css'


/* ===== DEFINITION COMPOSANT Footer ===== */
/* Affichage du pied de page               */
function Footer() {
	return (
		<footer className='footer'> 
			<div className='footer-elem'>
				L'épicerie d'un petit village blanc de la Sérénia de RONDA {/* Contenu du pied de page */}
			</div>
		</footer>
	)
}

// Exportation du composant Footer pour pouvoir l'utiliser dans d'autres fichiers
export default Footer
