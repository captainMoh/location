import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

import background0 from '../image/208.png'
import background1 from '../image/301.png'
import background2 from '../image/logan.png'
import background3 from '../image/stepway.png'

const Form = () => {

    const stripe = useStripe();
    const elements = useElements();

    const { id_voiture, start, end, voiture, heure, lieuRdv } = useParams()

    const numReservation = useMemo(() => {
        return Math.random().toString(36).replace(/[0-9]/g, '').substring(1,10).toUpperCase() + new Date().getTime();
    }, [])


    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [codePostale, setCodePostale] = useState('')
    const [ville, setVille] = useState('')
    const [adresse, setAdresse] = useState('')
    const [selectedRadio, setSelectedRadio] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(true)
    const [click, setClick] = useState(false)
    const [codePays, setCodePays] = useState('+212')
    const radios = ['M.', 'Mme.']

    const time = useMemo(() => {
        return (new Date(end) - new Date(start)) / (1000*60*60*24)
    }, [end, start])

    const voitures = {
        '61aaad69b24387c1b8a7ee09': {
            identifiant: 1,
            prix: 50,
            background: background0
        },
        '61aaad89b24387c1b8a7ee0e': {
            identifiant: 2,
            prix: 40,
            background: background1
        },
        '61aaad9cb24387c1b8a7ee11': {
            identifiant: 3,
            prix: 30,
            background: background2
        },
        '61aaada8b24387c1b8a7ee14': {
            identifiant: 4,
            prix: 20,
            background: background3
        }

    }

    const currentVoiture = voitures[id_voiture]

    let object = {
        numReservation: numReservation,
        lieu: lieuRdv,
        sortie: start,
        retour: end,
        heure: heure.split(':').join('h'),
        genre: selectedRadio,
        prenom: prenom,
        nom: nom,
        email: email,
        tel: `${codePays} ${telephone}`,
        code: codePostale,
        ville: ville,
        adresse: adresse
    }

    const options = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }

    const modif = e => {
        axios.patch(`/voiture/${id_voiture}`, { location:object, voiture:voiture }, options)
        .then(res => {
            console.log(res.data)
            window.location.href = '/success'
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setClick(true)
        if(!stripe || !elements) return;
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                address: {
                    city: ville,
                    line1: adresse,
                    postal_code: codePostale
                },
                name: `${nom} ${prenom}`,
                email: email,
                phone: `${codePays} ${telephone}`
            }
        });

        if(!error) {
            const { id } = paymentMethod
            axios.post(
                '/create-payment-intent',
                {
                    identifiant: currentVoiture.identifiant,
                    time,
                    id
                }
            ).then(response => {
                if(response.data.payment.status === 'requires_action') {
                    stripe.confirmCardPayment(
                        response.data.clientSecret, {
                            payment_method: {
                                card: elements.getElement(CardElement),
                                billing_details: paymentMethod.billing_details
                            },
                        }
                    ).then(() => {
                        modif()
                    }).catch(error => {
                        console.log('payment fail apres 3d secure', error);
                        setClick(false)
                        setPaymentSuccess(false)
                        alert(`l'authentification à échoué ou verifiez votre compte`)
                    }) 
                    
                }
                else if (response.data.payment.status === 'succeeded') {
                    //succès direct
                    modif()
                }

            }).catch(error => {
                console.log(error.message);
                setClick(false)
                setPaymentSuccess(false)
                alert('Verifiez vos coordonnées bancaire')
            })
            
        } else {
            setClick(false)
            setPaymentSuccess(false)
            alert('Remplissez correctement le formulaire')
        }
    }


    return (
        <div className='form'>
        <Header />
        <h1>Coordonnées de Réservation</h1>
        {!paymentSuccess && <p className='paymentNotSuccess'>Le paiement n'est pas passé veuillez réessayer ou vérifier votre solde</p>}
            <div className="reservation">
                <div className="resume">
                    <h1>{voiture}</h1>
                    <div className="image" style={{background: `url(${currentVoiture.background}) center/contain no-repeat`}}></div>
                    <div className="informations">
                        <p>Lieu de rendez-vous : <span>{lieuRdv}</span></p>
                        <p>Départ : <span>{start.split('-').reverse().join('-')} à {heure.split(':').join('h')}</span></p>
                        <p>Retour : <span>{end.split('-').reverse().join('-')} à {heure.split(':').join('h')}</span></p>
                        <p>Prix de la Réservation : <span>{currentVoiture.prix * time}€</span></p>
                    </div>
                </div>
                <form id="formulaire" onSubmit={handleSubmit} >
                    <div className="radio">
                    {radios.map(radio => 
                        (
                            <li key={radio}>
                                <input type='radio' value={radio} id={radio}
                                checked={radio === selectedRadio} onChange={e => setSelectedRadio(e.target.value)} />
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    )}
                    </div>

                    <div className="prenom-nom">
                        <input type="text" pattern='[^<>]+' placeholder="Prénom *" value={prenom} onChange={e => setPrenom(e.target.value)} id="input-prenom" required />
                        <input type="text" pattern='[^<>]+' placeholder="nom *" value={nom} onChange={e => setNom(e.target.value)} id="input-nom" required />
                    </div>

                    <div className="email">
                        <input type="email" pattern='[^<>]+' placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} id="input-email" required />
                    </div>

                    
                    <div className="ville-code">
                        <input type="text" pattern='[^<>]+' placeholder="Code Postal *" value={codePostale} onChange={e => setCodePostale(e.target.value)} id="input-code" required />
                        <input type="text" pattern='[^<>]+' placeholder="Ville *" value={ville} onChange={e => setVille(e.target.value)} id="input-ville" required />
                    </div>
                        
                    <div className="adresse">
                        <input id="input-adresse" pattern='[^<>]+' placeholder="Adresse *" value={adresse} onChange={e => setAdresse(e.target.value)} minLength="5" required />
                    </div>

                    <div className="telephone">
                        <select value={codePays} onChange={e => setCodePays(e.target.value)}>
                            <option>+212</option>
                            <option>+33</option>
                            <option>+32</option>
                        </select><input type="tel" placeholder="0650123456" value={telephone}  onChange={e => setTelephone(e.target.value)} pattern="[0-9]{10}|[0-9]{9}" id="input-tel" required />
                        
                    </div>

                    <CardElement className='input_card' options={{hidePostalCode:true}} required/>

                    <input type="submit" disabled={click} value={click ? "Paiment..." : `Réserver`} id="bouton" />
                
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Form;