import React from 'react'
import { LoginPage } from './LoginPage/Login.page'
import { DeviceLayout } from './DevicesLayout/Devices.layout'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { ProtectedRoute } from './protected.route'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <ProtectedRoute exact path='/devices' component={DeviceLayout} />
        <Route exact path='*' component={() => '404 not found'} />
      </Switch>
    </div>
  );
}

export default App;
