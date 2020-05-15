import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import GymShow from './components/gym/GymShow'
import gymLocations from './components/gym/gymLocations'


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
    </>
  )
}

export default App
