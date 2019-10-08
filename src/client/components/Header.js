import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';

const Header = () => (
    <header className="header">
        <AuthConsumer>
            { ({ isAuth, logout }) => (
            <div className="content-container-l">
                <div className="header__content">
                    <Link className="header__title" to="/dashboard">
                        <h1 className="header__logo">Ipse Dixit</h1>
                    </Link>
                    <div className="header__buttons">
                    {
                        isAuth ? (
                            <Fragment>
                                <Link to="/profile">
                                    <button className="button">Profile</button>
                                </Link>
                                <button className="button" onClick={logout}>Logout</button>
                            </Fragment>
                            
                        ) : (
                            <Fragment>
                                <Link to="/login">
                                    <button className="button">Login</button>
                                </Link>
                                
                                <Link to="/register">
                                    <button className="button">Register</button>
                                </Link>
                            </Fragment>
                        )
                    }  
                        
                    </div>
                    
                </div> 
            </div>
            )}
            
        </AuthConsumer>
    </header>
);

export default Header;