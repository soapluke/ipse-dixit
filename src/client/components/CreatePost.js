import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { history } from '../routers/AppRouter';
import client from '../utils/mappersmith';


const registerValidation = Yup.object().shape({
    title: Yup.string()
        .required('You need a title for your post!'),
    postBody: Yup.string()
        .required('Write something!')
        .max(300, 'Sorry, but 300 characters is the maximum.')
});

const CreatePost = () => (
    <div className="content-container-s">
        <h2>Write a post</h2>
        <Formik
            initialValues={{title: '', postBody: '' }}
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
                    type="test"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    className={
                        errors.title && touched.title ? 'error' : ''
                    }
                />
                {
                    (() => {
                        if (status && status.title)
                           return <div className="error-msg">{status.title}</div>
                        if (errors.title && touched.title)
                           return <div className="error-msg">{errors.title}</div>
                    })()
                 }
                <textarea
                    type="text"
                    name="postBody"
                    placeholder="Ipse Dixit!"
                    rows="10"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={
                        errors.postBody && touched.postBody ? 'error' : ''
                    }
                />
                {
                    (() => {
                        if (status && status.postBody)
                           return <div className="error-msg">{status.postBody}</div>
                        if (errors.postBody && touched.postBody)
                           return <div className="error-msg">{errors.postBody}</div>
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

export default CreatePost;