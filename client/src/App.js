import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from 'react';
import Home from './pages/Home'
//import Reservation from './pages/Reservation'
//import Form from './pages/Form'
import Success from './pages/Success'
import StripeContainer from "./components/StripeContainer";
import Accueil from "./pages/Accueil";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path='/reservation-voiture' element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/success' element={<Success />} />
        <Route path='/reservation-voiture/formulaire/:start/:end/:heure/:lieuRdv/:voiture/:id_voiture' element={<StripeContainer />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
