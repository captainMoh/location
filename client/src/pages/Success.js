import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCheck } from "@fortawesome/free-solid-svg-icons";

const Success = () => {

    const [second, setSecond] = useState(5)

    useEffect(() => {

        const timer = setInterval(() => {
            setSecond(second - 1)
        }, 1000);

        setTimeout(() => {
            window.location.href='/'
            }, 5000);

        return () => clearInterval(timer)
        
    }); 
    
    

    return (
        <div className='success'>
            <div className="box">
                <div className="entete">
                    <FontAwesomeIcon className='icone' icon={faCheckCircle} />
                    <h1>Paiement réussi</h1>
                    
                </div>
                <div className="bas">
                    <p><FontAwesomeIcon className='check' icon={faCheck} /> Vous allez recevoir un email résumant votre réservation</p>
                    <p>Vous allez être redirigé vers la page d'accueil dans {second} secondes</p>
                </div>
            </div>
        </div>
    );
};

export default Success;