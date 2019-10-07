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
            onSubmit={(values, { setSubmitting }) => {
                console.log(values.username)
                client.User.create({
                    body: {
                        username: values.username,
                        email: values.email,
                        password: values.password
                    }
                }).then(res => console.log(res));
                setSubmitting(false);
            }}
        >
        {({
            values,
            errors,
            touched,
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
                <ErrorMessage name="username" render={msg => <div className="error-msg">{msg}</div>} />
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
                <ErrorMessage name="email" render={msg => <div className="error-msg">{msg}</div>} />
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
                <ErrorMessage name="password" render={msg => <div className="error-msg">{msg}</div>} />
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