import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import gymLocations from './components/gym/gymLocations'


const App = () => {
  return (

      <BrowserRouter>
      <Switch>
      <Route path='/gym' compoments={gymLocations} />
      </Switch>
      </BrowserRouter>
  )
}

export default App
