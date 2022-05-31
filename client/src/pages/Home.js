import React, { useMemo, useState } from 'react'
import axios from 'axios'
import CardsVoitures from '../components/CardsVoitures';
import Header from '../components/Header';
import loader from '../assets/tail-spin.svg';
import Footer from '../components/Footer';

const Home = () => {
    //const today = new Date().toISOString().split('T')[0]
    const today = useMemo (( ) => 
         new Date().toISOString().split('T')[0],
        [])

    const [start, setStart] = useState(today)

    const jour = new Date(start)
    jour.setDate(jour.getDate() + 3)
    let demain = jour.toISOString().split('T')[0]

    const [end, setEnd] = useState(demain)
    const [time, setTime] = useState(3)
    const [heure, setHeure] = useState('08:30')
    const [lieuRdv, setLieuRdv] = useState('Ahfir')
    const [aucuneVoitureLibre, setAucuneVoitureLibre] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [disponible, setDisponible] = useState([])

    const date = e => {
        setStart(e.target.value)

        let day = new Date(e.target.value)
        day.setDate(day.getDate() + 3)
        let tomorrow = day.toISOString().split('T')[0]
        setEnd(tomorrow)
    }

    const tomorrowDate = e => {
        setEnd(e.target.value)

    }

    const changeHeure = e => {
        setHeure(e.target.value)
    }

    const changeLieuRdv = e => {
        setLieuRdv(e.target.value)
    }

    const calculTemps = async () => {
        let debut = new Date(start)
        let fin = new Date(end)
        setTime((fin - debut) / (1000*60*60*24))
    }

    const rechercher = () => {
        const voituresDisponibles = []
        setIsLoading(true)
        axios.get('/voiture')
            .then(res => {

                res.data.filter(voiture => {
                    const voitureLibre = voiture.location.map(date => {
                        if(!((new Date(start) < new Date(date.sortie) && new Date(end) < new Date(date.sortie))
                        || (new Date(start) > new Date(date.retour) && new Date(end) > new Date(date.retour)))){
                            return false
                        }
                        return date
                    })
                    
                    if(!voitureLibre.includes(false)) voituresDisponibles.push(voiture)
                    return voituresDisponibles
                })
                
                setDisponible(voituresDisponibles)
                calculTemps()
                
                if(voituresDisponibles.length === 0) {
                    setAucuneVoitureLibre(true) 
                    setIsLoading(false)
                    return
                }
                setAucuneVoitureLibre(false)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error)
            })
    }
    
    return (
        <div className='home'>
            <div className="titre">
                <Header />
            </div>

            <div className="calendrier_reservation">
                <div className="calendrier">
                    <h1>Reservez votre voiture</h1>

                    <div id="champs">
                        <div id="lieu_rdv">
                            <p>Lieu de Rdv</p>
                            <select value={lieuRdv} onChange={changeLieuRdv}>
                                <option>Aéroport Oujda</option>
                                <option>Ahfir</option>
                                <option>Berkane</option>
                            </select>
                        </div>

                        <label className="premier-jour" htmlFor="">
                            Du
                            <input id="start" type="date" value={start} min={today} onChange={date} required/>
                            <input type="time" step="1800" min="08:30" max="23:00" value={heure} onChange={changeHeure} />
                        </label>
            
                        <label className="dernier-jour" htmlFor="">
                            Au
                            <input id="end" type="date" value={end} min={demain} onChange={tomorrowDate} required/>
                            <input type="time" min="08:30" max="23:00" value={heure} onChange={changeHeure} />
                        </label>

                        <button type="button" onClick={rechercher} className="valider">Rechercher</button>
                    </div>

                    </div>
                <div className="afficheTemps">{time} {time > 1 ? 'jours':'jour'}</div>
		    </div>

            <div className='cartes'>
            {isLoading ? <img src={loader} alt='loader' /> : disponible.map(voiture => (
                <CardsVoitures voiture={voiture} start={start} end={end} heure={heure} lieuRdv={lieuRdv} time={time} key={voiture._id} />
           ))}
            {aucuneVoitureLibre && !isLoading && <p className='aucuneVoiture'>Malheureusement aucune voiture n'est disponible pour ces dates, veuillez selectionner d'autres dates</p>}

            </div>

            <Footer />
        </div>
    );
};

export default Home