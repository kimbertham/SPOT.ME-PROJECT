import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import Map from './components/map/Map'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <GymLocations/>

        </Switch>
      </BrowserRouter>
      <Map />
    </>
  )
}

export default App
