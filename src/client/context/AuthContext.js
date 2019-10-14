import React, { useState } from 'react'
import client from '../utils/mappersmith';
import { history } from '../routers/AppRouter';

const AuthContext = React.createContext()

const AuthProvider = (props) => {

    const [auth, setAuth] = useState(false);
    const [credentials, setCredentials] = useState({
        id: '',
        email: '',
        username: ''
    });

    const login = ({ id, email, username }) => {
        setAuth(true)
        setCredentials({
            id,
            email,
            username
        });
    }
    
    const logout = () => {
        let token = localStorage.getItem('jwt');
        client.User.logout({
            headers: { Authorization: `Bearer ${token}` }
        })
        localStorage.clear();
        setAuth(false);
        setCredentials({
            id: '',
            email: '',
            username: ''
        });
        history.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{
            isAuth: auth,
            currentCredentials: credentials,
            login,
            logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }