import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <GymLocations/>

        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
