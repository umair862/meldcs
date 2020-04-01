import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Cookies from 'js-cookie';
import './DevicesLayout.css';

export const DeviceLayout = (props) => {
    const { token, devices } = useSelector(state => ({ ...state.loginReducer, ...state.deviceReducer }));
    console.log(token);
    const numDevices = devices && devices.devices && devices.devices.length;
    console.log(numDevices);
    const dispatch = useDispatch();
    const [delay, setDelay] = useState(5000);

    const fetchDevices = () => {
        const devicesUrl = 'http://35.201.2.209:8000/devices';
        fetch(devicesUrl)
            .then(async response => {
                const data = await response.text();
                if (response.ok) {
                    dispatch({
                        type: 'GET_DEVICES',
                        payload: JSON.parse(data)
                    });
                } else
                // check for error response
                {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            })
            .catch(error => {

                console.error('There was an error!', error);
            });

    }

    useEffect(() => {
        //fetch data after component did mount
        fetchDevices();
    }, []);

    useInterval(() => {
        // Your custom logic here
        fetchDevices();
    }, delay);

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest function.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    const logOut = (e) => {
        e.preventDefault();
        Cookies.remove('AUTHENTICATED');
        dispatch({
            type: 'LOGOUT',
            payload: ''
        });
        props.history.push('/')
    }

    const drawDevices = (number) => {
        const deviceArr = [];
        const maxAngle = 360;
        const positionIndex = maxAngle / number;
        let position = positionIndex;
        for (let i = 0; i < number; i++) {
            deviceArr.push(<div key={i} className="dot" style={{ transform: `rotate(${position}deg)` }}></div>);
            position = position + positionIndex;
        }
        position = 0;
        return deviceArr;
    }

    const notify = (e) => {
        e.preventDefault();
        console.log('NOTIFY CALLED');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Umair Cheema', email: 'umair.cheema@gmail.com', repoUrl:'', message:'Please find the link to code' })
        };
        fetch('http://35.201.2.209:8000/notify', requestOptions)
            .then(async response => {
                const data = await response.text();
                if (response.ok) {
                    
                }else
                // check for error response
                 {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

    return (
        <div className="devices">
            <div className="devices__infobox"><span className="devices__infobox--number">{numDevices}</span> Devices Online</div>
            <div className="devices__ring">
                {drawDevices(numDevices)}
            </div>
            <div className="devices__footer">
                <div className="devices__button">
                    <span className="button" onClick={notify}>NOTIFY</span>
                    <span className="button logout" onClick={logOut}>LOGOUT</span>
                </div>
            </div>
        </div>
    )
}
