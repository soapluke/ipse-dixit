import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import client from '../utils/mappersmith';

const Register = () => (
    <div className="content-container-s">
        <h2 className="register__title">Register account</h2>
        <Formik
            initialValues={{username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .min(3, 'Username must be at least 3 characters.')
                    .required('Username is required!'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required!'),
                password: Yup.string()
                    .min(7, 'Password must be at least 7 characters.')
                    .required('Password is required!'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            })}
            onSubmit={ async (values, actions) => {
                try {
                    await client.User.create({
                        body: {
                            username: values.username,
                            email: values.email,
                            password: values.password
                        }
                    })
                } catch (error) {
                    console.log(JSON.parse(error.responseData));
                    let errorString = JSON.parse(error.responseData).errors[0].message
                    actions.setStatus({
                        username: errorString.includes('username') ? 'Username must be uniqe.' : '',
                        email: errorString.includes('email') ? 'This email already exists.' : '',
                        password: errorString.includes('password') ? errorString : '',
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
            handleSubmit,
            isSubmitting
        }) => (
            <form className="register__form" onSubmit={handleSubmit}>
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
                {status && status.username ? (
                    <div className="error-msg">{status.username}</div>
                  ) : (
                    errors.username && <div className="error-msg">{errors.username}</div>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={
                        errors.email && touched.email ? 'error' : ''
                    }
                />
                {status && status.email ? (
                    <div className="error-msg">{status.email}</div>
                  ) : (
                    errors.email && <div className="error-msg">{errors.email}</div>
                )}
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
                {status && status.password ? (
                    <div className="error-msg">{status.password}</div>
                  ) : (
                    errors.password && <div className="error-msg">{errors.password}</div>
                )}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className={
                        errors.confirmPassword && touched.confirmPassword ? 'error' : ''
                    }
                />
                <ErrorMessage name="confirmPassword" render={msg => <div className="error-msg">{msg}</div>} />
                <button className="button button-register" type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        )}
        </Formik>
    </div>
);

export default Register;