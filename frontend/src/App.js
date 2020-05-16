import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import GymShow from './components/gym/GymShow'
import GymSearch from './components/gym/GymSearch'
import Map from './components/map/Map'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route path='/locations' component={GymLocations}/>
          <Route path='/locations/:placeId' component={GymShow} />
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
