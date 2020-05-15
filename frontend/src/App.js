import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import Navbar from './components/common/Navbar'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Switch>
        <Route exact path="/locations" component={GymLocations} />

        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
