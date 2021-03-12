import React from 'react'
import { BrowserRouter, Switch, Route,withRouter } from 'react-router-dom'
import GymLocations from './components/gym/gymLocations'
import GymShow from './components/gym/GymShow'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/profile/Profile'
import GroupShow from './components/groups/GroupShowPage'
import Home from './components/social/Home'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path='/locations/:placeId' component={GymShow} />
          <Route path='/locations' component={GymLocations}/>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route exact path='/profile/:userId' component={withRouter(Profile) }/>
          <Route path='/home' component={Home}/>
          <Route path='/groups/:groupId' component={GroupShow}/>

        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
