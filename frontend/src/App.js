import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import GymShow from './components/gym/GymShow'
import Map from './components/map/Map'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/locations' component={GymLocations}/>
          <Route path='/locations/:placeId' component={GymShow} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
