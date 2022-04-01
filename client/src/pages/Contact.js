import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Contact = () => {

    const [nom, setNom] = useState('')
    const [mail, setMail] = useState('')
    const [message, setMessage] = useState('')

    let object = {
        nom,
        mail,
        message
    }


    const options = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }

    const submit = async e => {
        //e.preventDefault();

        alert('mail envoyé')
        
        try {
            await axios.post('/contacts', {object}, options)
            .then(() => {
                setNom('')
                setMail('')
                setMessage('')
            })
            
        } catch (err) {
            console.log(err.response.data);
        }

        
    }


    return (
        <div className='contact'>
            <Header />
            <div className='content'>
                <form className='formulaire' onSubmit={submit}>
                    <h1>Formulaire de contact</h1>
                    <input type='text' placeholder='Nom' onChange={e => setNom(e.target.value)} required />
                    <input type='email' placeholder='email' onChange={e => setMail(e.target.value)} required />
                    <textarea placeholder='Entrez votre message' onChange={e => setMessage(e.target.value)} required />
                    <button type='submit'>Envoyer</button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;