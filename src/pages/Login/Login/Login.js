import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const googleIcon = <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
    const [loginData, setLoginData] = useState({});
    const { loginUser, signInWithGoogle, isLoading, authError } = useAuth()

    const location = useLocation();
    const history = useHistory()

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history)
        history.push(location?.state?.from)
    }
    return (
        <div>
            <div className="container">
                <div className="row my-5 py-5">


                    <div className="col-lg-3 col-md-2"></div>
                    {!isLoading && <div className="col-lg-6 col-md-8 col-12">
                        <h2>Please Login</h2>
                        <h4 className='text-danger'>{authError}</h4>
                        <Form onSubmit={handleLoginSubmit} className='text-start'>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email' onBlur={handleOnBlur} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='password' onBlur={handleOnBlur} />
                            </Form.Group>
                            <Link className='text-decoration-none' to='/register'><p>Don't have an Account ?</p></Link>
                            <Button className='btn btn-success px-4' type="submit">
                                Login
                            </Button>
                        </Form>
                        <p className='my-4'>-----------------------------</p>
                        <button className='btn btn-outline-success px-4' onClick={handleGoogleSignIn}>{googleIcon} Login With Google</button>
                    </div>}
                    {isLoading && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    <div className="col-lg-3 col-md-2 "></div>
                </div>
            </div>
        </div>
    );
};

export default Login;