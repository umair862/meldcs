import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {authenticated} = useSelector(state => ({...state.loginReducer}));
    return (
        <Route {...rest}
            render={props => {
                if (authenticated) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
            } />
    );
}