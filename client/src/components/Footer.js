import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapLocation } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='first-child'>
                <div className='numero'>
                    <h3>Contactez-nous</h3>
                    <p>
                        <FontAwesomeIcon icon={faPhone} /> <a href="tel:+212639674394">+212 6 39 67 43 94</a> / <a href='tel:+212625053393'>+212 6 25 05 33 93</a>
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faMapLocation} /> <a href='/'>28 Rue El Moutanabi Hay salam - Berkane</a> / <a href='https://goo.gl/maps/WyrskeW6AmS3ykhy6'>82 Rue Khalid Ibn Walid - Ahfir</a>
                    </p>
                    
                </div>
            </div>
            <p>©copyright -all rights reserved</p>
        </footer>
    );
};

export default Footer;