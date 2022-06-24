import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import background0 from '../image/208.png'
import background1 from '../image/301.png'
import background2 from '../image/logan.png'
import background3 from '../image/stepway.png'


const CardsVoitures = ({ voiture, start, end, heure, lieuRdv, time }) => {

    let carburant = 'Diesel'

    const backgroundVoiture = {
        '61aaad69b24387c1b8a7ee09': {
            imageVoiture: background0
        },
        '61aaad89b24387c1b8a7ee0e': {
            imageVoiture: background1
        },
        '61aaad9cb24387c1b8a7ee11': {
            imageVoiture: background2
        },
        '61aaada8b24387c1b8a7ee14': {
            imageVoiture:  background3
        }
    }

    const currentVoiture = backgroundVoiture[voiture._id]

    return (
        <div className='cardsVoitures'>
            <div className="image_voiture" style={{
                background: `url(${currentVoiture.imageVoiture}) center/contain no-repeat`,
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
                    <h1>{time * voiture.prix}€</h1>
                    <p>{voiture.prix}€/Jour</p>
                </div>
                <Link to={`formulaire/${start}/${end}/${heure}/${lieuRdv}/${voiture.voiture}/${voiture._id}`}>Réserver maintenant <FontAwesomeIcon icon={faAngleDoubleRight} /></Link>
            </div>
        </div>
    );
};

export default CardsVoitures;