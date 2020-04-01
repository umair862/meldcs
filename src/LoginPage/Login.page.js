import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import * as Cookies from 'js-cookie';
import './LoginPage.css';

export const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        //after component did mount
        const cookieVal=Cookies.get('AUTHENTICATED');
        console.log(cookieVal);
        if(cookieVal){
            dispatch({
                type: 'AUTHENTICATE_TRUE',
                payload: cookieVal
            });
            props.history.push('/devices');
        }
    }, []);
    const login = (e) => {
        e.preventDefault();
        console.log('LOGIN CALLED');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        fetch('http://35.201.2.209:8000/login', requestOptions)
            .then(async response => {
                const data = await response.text();
                if (response.ok) {
                    dispatch({
                        type: 'AUTHENTICATE_TRUE',
                        payload: data
                    });
                    Cookies.set('AUTHENTICATED', data);
                    props.history.push('/devices');
                }else
                // check for error response
                 {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            })
            .catch(error => {
                setError('There was an error!');
                console.error('There was an error!', error);
            });
    }

    return (
            <div className="login-wrapper">
            <form onSubmit={login}>
                <div className="login">
                    <h1 className="login__header">Login</h1>
                    <div className="login__input__wrapper"><input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" name="email" placeholder="Email Address" /></div>
                    <div className="login__input__wrapper"><input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="pass" name="password" placeholder="password" required /></div>
                    <div className="login__submit"><button type="submit">Log In</button></div>
                    <div className="login__error">{error}</div>
                </div>
            </form>
            </div>

    )
}
