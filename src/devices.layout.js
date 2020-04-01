import React from 'react';
import auth from './auth';


export const DeviceLayout = (props) => {
    return (
        <div className="device-layout">
            <h1>Device layout page</h1>
            <button onClick={() => {
            auth.login(() => {props.history.push('/')})
        }}>Logout</button>
        </div>
    )
}
