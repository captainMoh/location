import React from 'react';
import Reservation from './Reservation';

const AdminVoiture = ({voiture}) => {
    

    return (
        <div className='admin-voiture-affiche'>
            <h1>{voiture.voiture}</h1>

            {voiture.location.map(location => (
                <Reservation reservation={location} key={location._id} />
            ))}
        </div>
    );
};




export default AdminVoiture;