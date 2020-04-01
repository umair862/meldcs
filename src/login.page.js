import React from 'react';
import auth from './auth';

export const LoginPage = (props) => {
    return (
        <form onSubmit={() => {
            auth.login(() => {props.history.push('/devices')})
        }}>
        <div className="login">
           <input type="email" id="email" name="email" placeholder="Email Address" />
           <input type="password" id="pass" name="password" placeholder="password" required /> 
           <button>Submit</button>
        </div>
        </form>
    )
}
