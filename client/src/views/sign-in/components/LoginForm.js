import React from 'react';
import { Form, Field, withFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const url = 'http://localhost:3300/api/auth/login';

const LoginForm = () => {
    return (
        <Form>
            <Field type="text" name="username" autoComplete="off" placeholder="Username" />
            <Field type="password" name="password" autoComplete="off" placeholder="Password" />
            <button type="submit">LOGIN</button>
        </Form>
    );
};

export default withFormik({
    mapPropsToValues() {
        return {
            username: '',
            password: ''
        }
    },
    validationSchema: yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    }),
    handleSubmit(values, formikBag) {
        formikBag.resetForm();
        console.log(values);
        
        axios.post(url, values)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
})(LoginForm);