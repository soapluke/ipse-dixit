import React, { useState } from 'react'
import client from '../utils/mappersmith';
import { history } from '../routers/AppRouter';

const AuthContext = React.createContext()

const AuthProvider = (props) => {

    const [auth, setAuth] = useState(false);

    const login = () => {
        setAuth(true)
    }
    
    const logout = () => {
        let token = localStorage.getItem('jwt');
        console.log(token)
        client.User.logout({
            headers: { Authorization: `Bearer ${token}` }
        })
        localStorage.clear();
        setAuth(false);
        history.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{
            isAuth: auth,
            login,
            logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }