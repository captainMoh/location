import React, { useState } from 'react';
import axios from 'axios';
import AdminVoiture from '../components/AdminVoiture';

const Admin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [connect, setConnect] = useState(false)
    const [data, setData] = useState([])

    const options = {
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }

    const login = e => {
        e.preventDefault()

        axios.post('/user/login', {email, password}, options)
        .then((response) => {

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

            loadVoiture()
        })
        .catch(err => console.log(err.response.status))
    }

    const loadVoiture = () => {
        axios.get('/admin/voiture')
        .then(res => setData(res.data))
        .then(() => setConnect(true))
        .catch(err => console.log(err))
    }

    if(!connect) {
        return (
            <div className='admin'>
                <h1>Admin</h1>
    
                <form onSubmit={login}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
    
                    <label htmlFor='password'>Mot de Passe</label>
                    <input type='text' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
    
                    <button type='submit'>login</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className='admin-voiture'>
                {data.map(voiture => (
                    <AdminVoiture voiture={voiture} key={voiture._id} />
                ))}
            </div>
        );
    }
};

export default Admin;