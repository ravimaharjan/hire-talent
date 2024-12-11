import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './loginSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, FormGroup, Row, Col, Label, Input, Button, Alert, Container } from 'reactstrap';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatach = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            console.log(formErrors)
        } else {
            await dispatach(login({ email, password }));
            // console.log('result', unwrapResult(result));
            navigate('/home')
        }

    }

    return (
        <div className='login-container'>
            {/* <div className="App"> */}
            <div >Sign In</div>
            <Form className="form" onSubmit={handleSubmit}>
                {/* <FormGroup> */}
                <div>
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                </div>
                <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="example@example.com"
                    className='cu-input'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* </FormGroup> */}
                <FormGroup>
                    <div>
                        <Label for="examplePassword">Password</Label>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        className='cu-input'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button color='primary' size='md' >Login</Button>
            </Form>
            {/* </div> */}
        </div>
    )
}

export default LoginPage;