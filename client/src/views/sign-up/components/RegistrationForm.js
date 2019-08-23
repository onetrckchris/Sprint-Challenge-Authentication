import React from 'react';
import { Form, Field, withFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const url = 'http://localhost:3300/api/auth/register';

const RegistrationForm = () => {
    return (
        <Form>
            <Field type="text" name="username" autoComplete="off" placeholder="Username" />
            <Field type="password" name="password" autoComplete="off" placeholder="Password" />
            <button type="submit">REGISTER</button>
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
            .then(res => {
                formikBag.props.history.push('/api/auth/login');
            })
            .catch(err => console.log(err));
    }
})(RegistrationForm);