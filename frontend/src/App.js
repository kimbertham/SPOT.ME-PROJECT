import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import GymSearch from './components/gym/gymSearch'
import Map from './components/map/Map'
import Navbar from './components/common/Navbar'


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Switch>
        <Route path="/locations" component={GymLocations} />
        <Route path="/locations:id" component={GymSearch} />
        </Switch>
      </BrowserRouter>
      <Map />
    </>
  )
}

export default App
