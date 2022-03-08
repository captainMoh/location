import React from 'react';
import Navigation from './Navigation';
import logo from '../image/logo3.PNG'

const Header = () => {
    return (
        <div className='header'>
            <div className="title" style={{
                width: '300px',
                height: '100px',
                background: `url(${logo}) center/contain no-repeat`
            }}>
            </div>
            
            <div className="nav">
                <Navigation />
            </div>
        </div>
    );
};

export default Header;