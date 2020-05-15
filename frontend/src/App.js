import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import GymShow from './components/gym/GymShow'
import GymSearch from './components/gym/GymSearch'
import Map from './components/map/Map'
import Navbar from './components/common/Navbar'


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route path='/locations' component={GymLocations}/>
          <Route path='/locations/:placeId' component={GymShow} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
