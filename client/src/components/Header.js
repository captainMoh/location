import React from 'react';
import Navigation from './Navigation';

const Header = () => {
    return (
        <div className='header'>
            <div className="title"></div>
            
            <div className="nav">
                <Navigation />
            </div>
        </div>
    );
};

export default Header;