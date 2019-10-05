import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/dashboard">
                        <h1 className="header__logo">Ipse Dixit</h1>
                    </Link>
                    <div className="header__buttons">
                        <button className="button">Login</button>
                        <button className="button">Register</button>
                    </div>
                    
                </div> 
            </div>
        </header>
    );
}

export default Header;