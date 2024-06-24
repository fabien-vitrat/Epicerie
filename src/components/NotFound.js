/* APPARAÎT LORSQUE LA PAGE SUR LAQUELLE ON EST EST INEXISTANTE */

// Importation du module React
import React from "react";

// Importation des composants Navbar et Footer
import Navbar from "./Navbar";
import Footer from "./Footer";

// Importation des styles pour ce composant
import '../styles/NotFound.css'

/* ===== DEFINITION COMPOSANT NotFound ===== */
/* Affichage d'une page si lien inexistant   */
function NotFound() {
  return (
    <div>
      <Navbar />
      <h1>PAGE INEXISTANTE ....</h1>
      <Footer />
    </div>
  );
}

// Exportation du composant NotFound pour pouvoir l'utiliser dans d'autres fichiers
export default NotFound;
