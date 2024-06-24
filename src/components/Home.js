//Importation des blibliothéques
import React from "react";

//Importation des composants
import Navbar from "./Navbar";
import Footer from "./Footer";

//Importation image
import Logo from '../assets/logo.png'

//Importation feuille de styles
import "../styles/Home.css";

/* ===== DEFINITION COMPOSANT Home ===== */
/* Affichage de la page d'accueil        */
function Home() {
  return (
    <div>
      {/* Affichage de la barre de navigation */}
      <Navbar />

      {/* Affichage du contenu de la page d'accueil */}
      <div className="accueil">
        <div className="accueil-info">
          <img src={Logo} alt="Logo épicerie"/>
          <h1>Épicerie de Cartajima</h1>
          <p>Ne cherchez plus,</p>
          <p>les meilleurs prix sont chez nous.</p>
        </div>
      </div>

      {/* Affichage du pied de page */}
      <Footer />
    </div>
  );
}

export default Home;