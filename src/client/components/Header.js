import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Ipse Dixit</h1>
                </Link>
            </div>  
        </header>
    );
}

export default Header;