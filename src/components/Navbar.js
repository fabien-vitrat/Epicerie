// Importation des modules React nécessaires
import React, { useEffect, useState } from "react";

// Importation des icônes de menu et de fermeture
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

// Importation des composants de routage de react-router-dom
import { Link, NavLink} from "react-router-dom"; 

// Importation des styles pour ce composant
import "../styles/Navbar.scss";

// Liste des liens à afficher dans le menu.
const chxMenu = [
  { nom: ' Accueil', to: '/', icon: 'fa-solid fa-house' },
  { nom: ' Achat', to: '/Achat', icon: 'fa-solid fa-cart-shopping'},
  { nom: ' Ticket', to: '/Ticket', icon: 'fa-solid fa-receipt'},
  { nom: ' Paiement', to: '/Paiement', icon: 'fa-solid fa-euro-sign'},
  { nom: ' Caisse', to: '/Caisse', icon: 'fa-solid fa-cash-register'},
];

/* ===== DEFINITION COMPOSANT Navbar ===== */
/* Affichage du bandeau menu               */
function Navbar() {
  // État pour gérer l'ouverture/fermeture du menu
  const [menuOpen, setMenuOpen] = useState(false);

  // État pour stocker la taille de la fenêtre
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  // Effet pour mettre à jour la taille de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effet pour fermer le menu lors du redimensionnement de la fenêtre
  useEffect(() => {
    if (size.width > 960 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  // Fonction pour basculer l'état du menu (ouvrir/fermer)
  const menuToggleHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="header"> {/* Conteneur de l'en-tête */}
      <div className="header__content">
        <Link to="/" className="header__content__logo"> {/* Lien vers la page d'accueil */}
          Epicerie de Cartajima
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 960 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            {/* Mapping sur la liste des liens du menu */}
            {chxMenu.map((chMenu,ind_m) => {
              return (
                <li key={ind_m}>   
                  <NavLink
                    to={chMenu.to}
                    className={({isActive}) => (isActive ? "active" : 'none')} // Classe active pour le lien actif
                  >
                    <i className={chMenu.icon}></i> {/* Icône du lien */}
                    {chMenu.nom} {/* Texte du lien */}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header__content__toggle"> {/* Bouton de bascule du menu */}
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
