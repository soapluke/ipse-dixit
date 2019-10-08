import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { history } from '../routers/AppRouter';
import client from '../utils/mappersmith';


const registerValidation = Yup.object().shape({
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
});

const Register = () => (
    <div className="content-container-s">
        <h2>Register account</h2>
        <Formik
            initialValues={{username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={registerValidation}
            onSubmit={ async (values, actions) => {
                try {
                    await client.User.create({
                        body: {
                            username: values.username,
                            email: values.email,
                            password: values.password
                        }
                    })
                    history.push('/registered');
                } catch (error) {
                    console.log(JSON.parse(error.responseData));
                    let errorString = JSON.parse(error.responseData).errors[0].message
                    actions.setStatus({
                        username: errorString.includes('username') ? 'This username already exists.' : '',
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
                {
                    (() => {
                        if (status && status.username)
                           return <div className="error-msg">{status.username}</div>
                        if (errors.username && touched.username)
                           return <div className="error-msg">{errors.username}</div>
                    })()
                 }
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
                {
                    (() => {
                        if (status && status.email)
                           return <div className="error-msg">{status.email}</div>
                        if (errors.email && touched.email)
                           return <div className="error-msg">{errors.email}</div>
                    })()
                 }
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
                    (() => {
                        if (status && status.password)
                           return <div className="error-msg">{status.password}</div>
                        if (errors.password && touched.password)
                           return <div className="error-msg">{errors.password}</div>
                    })()
                }
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
                {
                    (() => {
                        if (status && status.confirmPassword)
                           return <div className="error-msg">{status.confirmPassword}</div>
                        if (errors.confirmPassword && touched.confirmPassword)
                           return <div className="error-msg">{errors.confirmPassword}</div>
                    })()
                }
                <button className="button button-blue" type="submit">
                    Submit
                </button>
            </form>
        )}
        </Formik>
    </div>
);

export default Register;