import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <NavLink to={'/'}><span>Accueil</span></NavLink>
            <NavLink to={'/reservation-voiture'}><span>Réservez-maintenant</span></NavLink>
            <NavLink to={'/contact'}><span>Contact</span></NavLink>
        </div>
    );
};

export default Navigation;