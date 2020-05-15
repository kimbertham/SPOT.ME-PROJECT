import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
<<<<<<< HEAD
import GymShow from './components/gym/GymShow'
import gymLocations from './components/gym/gymLocations'
=======
import Map from './components/map/Map'
>>>>>>> development


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route plath to='/locations' components={GymLocations}/>
          <Route path to='/locations/:placeId' component={GymShow} /> */}
          <GymLocations />
          {/* <GymShow/> */}
        </Switch>
      </BrowserRouter>
      <Map />
    </>
  )
}

export default App
