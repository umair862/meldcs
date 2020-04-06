import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
const loginReducer = (state = {count: 0, authenticated: false, token: ''}, action) => {
  switch (action.type) {
      case 'AUTHENTICATE_TRUE':
        return Object.assign({}, state, {authenticated: true, token: action.payload})
      
      case 'LOGOUT':
        return Object.assign({}, state, {authenticated: false, token: action.payload})  
  
    default:
      return state;
  }
}

const deviceReducer = (state = {devices: {}}, action) => {
  switch (action.type) {
    case 'GET_DEVICES':
      return Object.assign({}, state, {devices: action.payload})  

  default:
    return state;
}
}

const rootReducer = combineReducers({
  loginReducer,
  deviceReducer
})

const INITIAL_STATE = {}

const store = createStore(rootReducer, INITIAL_STATE);


ReactDOM.render(
  <Provider store={store}>   
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
