import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import background0 from '../image/208.png'
import background1 from '../image/301.png'
import background2 from '../image/logan.png'
import background3 from '../image/stepway.png'


const CardsVoitures = ({ voiture, start, end, heure, lieuRdv, time }) => {
    let identifiant
    let prix
    let carburant = 'Diesel'

    switch (voiture._id) {
        case '61aaad69b24387c1b8a7ee09':
            identifiant = background0;
            prix = 50;
            break;
        case '61aaad89b24387c1b8a7ee0e':
            identifiant = background1;
            prix = 40;
            break;
        case '61aaad9cb24387c1b8a7ee11':
            identifiant = background2;
            prix = 30;
            break;
        case '61aaada8b24387c1b8a7ee14':
            identifiant = background3;
            prix = 20;
            break;
        default:
            identifiant = 1;
            break;
    }

    return (
        <div className='cardsVoitures'>
            <div className="image_voiture" style={{
                background: `url(${identifiant}) center/contain no-repeat`,
            }}>
            </div>
            
            <div className="texte_voiture">
                <h3>{voiture.voiture}</h3>
                <div className="infos_voiture">
                    <p><FontAwesomeIcon icon={faCaretRight} /> {carburant}</p>
                    <p><FontAwesomeIcon icon={faCaretRight} /> Autoradio</p>
                    <p><FontAwesomeIcon icon={faCaretRight} /> Clim</p>
                    <p><FontAwesomeIcon icon={faCaretRight} /> Caution: xxxx€</p>
                </div>
            </div>

            <div className='prix_voiture'>
                <div className="infos_prix">
                    <h1>{time * prix}€</h1>
                    <p>{prix}€/Jour</p>
                </div>
                <Link to={`formulaire/${start}/${end}/${heure}/${lieuRdv}/${voiture.voiture}/${voiture._id}`}>Payer maintenant <FontAwesomeIcon icon={faAngleDoubleRight} /></Link>
            </div>
        </div>
    );
};

export default CardsVoitures;