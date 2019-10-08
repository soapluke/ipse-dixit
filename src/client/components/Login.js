import React from 'react';
import { Formik } from 'formik';
import { history } from '../routers/AppRouter';
import { AuthConsumer } from '../context/AuthContext';
import client from '../utils/mappersmith';


const Login = () => (
    <div className="content-container-s">
        <h2>Login</h2>
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
                    localStorage.setItem('jwt', token);
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
            <AuthConsumer>
                { ({ login }) => (
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
                        <button className="button button-blue" type="submit" onClick={login}>
                            Login
                        </button>
                    </form>
                )}
            </AuthConsumer>
        )}
        </Formik>
    </div>
)

export default Login;