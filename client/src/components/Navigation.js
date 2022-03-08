import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <Link to={'/'}><span>Accueil</span></Link>
            <Link to={'/reservation-voiture'}><span>Reservez-maintenant</span></Link>
            <Link to={'#'}><span>Contact</span></Link>
        </div>
    );
};

export default Navigation;