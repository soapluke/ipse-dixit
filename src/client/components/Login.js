import React from 'react';
import { Formik } from 'formik';
import { history } from '../routers/AppRouter';
import { AuthConsumer } from '../context/AuthContext';
import client from '../utils/mappersmith';


const Login = () => (
    <div className="content-container-s">
        <h2>Login</h2>
        <AuthConsumer>
        { ({ login }) => (
            <Formik
                initialValues={{username: '', password: ''}}
                onSubmit={ async (values, actions) => {
                    try {
                        const user = await client.User.login({
                            body: {
                                username: values.username,
                                password: values.password
                            }
                        });
                        const token = JSON.parse(user.responseData).token;
                        const credentials = JSON.parse(user.responseData).user;
                        console.log(credentials);
                        localStorage.setItem('jwt', token);
                        login(credentials);
                        history.push('/dashboard');
                    } catch (error) {
                        console.log(error);
                        let errorString = JSON.parse(error.responseData).msg;
                        actions.setStatus({
                            login: errorString
                        });
                    }
                    
                }}
            >
            {({
                values,
                errors,
                touched,
                status,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="username"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            className={
                                errors.username && touched.username ? 'error' : ''
                            }
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={
                                errors.password && touched.password ? 'error' : ''
                            }
                        />
                        {
                            status && status.login ? (
                                <div className="error-msg">{status.login}</div>
                            ) : (
                                null
                            )
                        }
                        <button className="button button-blue" type="submit">
                            Login
                        </button>
                    </form>
                )
                
            }
            </Formik>
        )}
        </AuthConsumer>
    </div>
)

export default Login;