import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocation } from '@fortawesome/free-solid-svg-icons';

const Accueil = () => {
    return (
        <div className='accueil'>
            <Header />
            <div className='content'>
                <div className='diapo'></div>

                <div className='texte'>
                    <h1>RHARRABTI Location</h1>
                    <p className='phrase'>
                        Agence de location voiture et mobylette.<br/>
                        Passez vos vacances à un prix avantageux.
                    </p>
                    <p className='numero'>
                        <FontAwesomeIcon icon={faPhone} /> <a href = "tel:+212639674394">+212 6 39 67 43 94</a> / <a href = "tel:+212625053393">+212 6 25 05 33 93</a>
                    </p>
                    <p className='adresse'>
                        <FontAwesomeIcon icon={faLocation} /> 28 Rue El Motanabi Hay salam - Berkane <br/>
                        ou <br/>
                        82 Rue Khalid Ibn Walid - Ahfir
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Accueil;