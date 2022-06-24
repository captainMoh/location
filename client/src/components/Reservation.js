import React, { useState } from 'react';


const Reservation = ({reservation}) => {

    const [nom, setNom] = useState(reservation.nom)
    const [prenom, setPrenom] = useState(reservation.prenom)
    const [lieu, setLieu] = useState(reservation.lieu)
    const [sortie, setSortie] = useState(reservation.sortie)
    const [retour, setRetour] = useState(reservation.retour)
    const [heure, setHeure] = useState(reservation.heure)
    const [genre, setGenre] = useState(reservation.genre)
    const [email, setEmail] = useState(reservation.email)
    const [tel, setTel] = useState(reservation.tel)
    const [code, setCode] = useState(reservation.code)
    const [ville, setVille] = useState(reservation.ville)
    const [adresse, setAdresse] = useState(reservation.adresse)
    

    return (
        <div className='reservation'>
            <h4>{reservation.numReservation}</h4>
            <input type='text' value={genre} onChange={e => setGenre(e.target.value)} />
            <input type='text' value={nom} onChange={e => setNom(e.target.value)} />
            <input type='text' value={prenom} onChange={e => setPrenom(e.target.value)} />
            <input type='text' value={lieu} onChange={e => setLieu(e.target.value)} />
            <input type='text' value={sortie} onChange={e => setSortie(e.target.value)} />
            <input type='text' value={retour} onChange={e => setRetour(e.target.value)} />
            <input type='text' value={heure} onChange={e => setHeure(e.target.value)} />
            <input type='text' value={tel} onChange={e => setTel(e.target.value)} />
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='text' value={code} onChange={e => setCode(e.target.value)} />
            <input type='text' value={ville} onChange={e => setVille(e.target.value)} />
            <input type='text' value={adresse} onChange={e => setAdresse(e.target.value)} />
        </div>
    );
};

export default Reservation;