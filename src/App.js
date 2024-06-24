//Importation des blibliothéques
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'

//Importation des composants
import Home from "./components/Home";
import Achat from "./components/Achat";
import Ticket from "./components/Ticket";
import Paiement from "./components/Paiement";
import PaiementCB from "./components/PaiementCB";
import PaiementCBTotal from "./components/PaiementCBTotal";
import PaiementTR from "./components/PaiementTR";
import PaiementTRTotal from "./components/PaiementTRTotal";
import PaiementESP from "./components/PaiementESP";
import PaiementESPMq from "./components/PaiementESPMq";
import PaiementESPCV from "./components/PaiementESPCv";
import PaiementESPARendre from "./components/PaiementESPARendre";
import PaiementESPTotal from "./components/PaiementESPTotal";
import Caisse from "./components/Caisse";
import NotFound from "./components/NotFound";

/* ===== DEFINITION FONCTION APP ===== */
/* Définition des routes               */
function App() {
  // Gestion de la donnée ticket
  const sauveTicket = localStorage.getItem('ticket')
  const [ticket, majTicket] = useState(sauveTicket ? JSON.parse(sauveTicket) : [])
  useEffect(() => {
      localStorage.setItem('ticket', JSON.stringify(ticket));
      majrestePayer(total);
      majrestePayerTR(totalTR);
  }, [ticket])

  //Gestion de la donnée caisse
  const sauveCaisse = localStorage.getItem('caisse')
  const [caisse, majCaisse] = useState(sauveCaisse ? JSON.parse(sauveCaisse) : [])
  useEffect(() => {
      localStorage.setItem('caisse', JSON.stringify(caisse))
  }, [caisse])

  //Gestion de la donnée ArgentARendre
  const sauveArgentARendre = localStorage.getItem('ArgentARendre');
  const [ArgentARendre, majArgentARendre] = useState(sauveArgentARendre ? JSON.parse(sauveArgentARendre) : []);
  useEffect(() => {
    localStorage.setItem('ArgentARendre', JSON.stringify(ArgentARendre))
  }, [ArgentARendre]);

  //Gestion de la donnée paiementESP
  const sauvePaiemESP = localStorage.getItem('PaiemESP');
  const [PaiemESP, majPaiemESP] = useState(sauvePaiemESP ? JSON.parse(sauvePaiemESP) : []);
  useEffect(() => {
    localStorage.setItem('PaiemESP', JSON.stringify(PaiemESP))
  }, [PaiemESP]);

  //Calcul du montant total du ticket
  const total = ticket.reduce(
    (acc, articlesType) => acc + articlesType.quantite * articlesType.prix,
    0
  )

  //Calcul du montant des achats pouvant etre payé en TR
  const totalTR = ticket
    .filter((art) => art.TR === "*")
    .reduce(
      (acc, articlesType) => acc + articlesType.quantite * articlesType.prix,
      0
    )

  // Déclaration variable du montant restant à payer
  const [restePayer, majrestePayer] = useState(0.0)

  // Déclaration variable du montant restant à payer en TR
  const [restePayerTR, majrestePayerTR] = useState(0.0)
  
  return (
    //Déclaration des routes des différentes pages
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Achat" element={<Achat ticket={ticket} majTicket={majTicket} total={total} restePayer={restePayer} />} />
      <Route path="Ticket" element={<Ticket ticket={ticket} total={total} totalTR={totalTR}/>} />
      <Route path="Paiement" element={<Paiement ticket={ticket} majTicket={majTicket} total={total} restePayer={restePayer} majrestePayer={majrestePayer} restePayerTR={restePayerTR} majrestePayerTR={majrestePayerTR}  />} />
      <Route path="PaiementCB" element={<PaiementCB />} />
      <Route path="PaiementCBTotal" element={<PaiementCBTotal />} />
      <Route path="PaiementTR" element={<PaiementTR />} />
      <Route path="PaiementTRTotal" element={<PaiementTRTotal />} />
      <Route path="PaiementESP" element={<PaiementESP restePayer={restePayer} caisse={caisse} majCaisse={majCaisse} PaiemESP={PaiemESP} majPaiemESP={majPaiemESP} ArgentARendre={ArgentARendre} majArgentARendre={majArgentARendre} />}/>
      <Route path="PaiementESPMq" element={<PaiementESPMq />} />
      <Route path="PaiementESPCV" element={<PaiementESPCV />} />
      <Route path="PaiementESPARendre" element={<PaiementESPARendre ArgentARendre={ArgentARendre} majArgentARendre={majArgentARendre}/>}/>
      <Route path="PaiementESPTotal" element={<PaiementESPTotal majTicket={majTicket} majPaiemESP={majPaiemESP} majArgentARendre={majArgentARendre}/>} />
      <Route path="Caisse" element={<Caisse caisse={caisse} majCaisse={majCaisse} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
