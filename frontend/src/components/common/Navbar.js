import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getProfile } from '../../lib/api'
import { notify } from '../../lib/notifications'
import { Link, withRouter } from 'react-router-dom'
import { getUserId, isAuthenticated, logout } from '../../lib/auth'

class Navbar extends React.Component{
  state = {
    user : {}
  }

  async componentDidMount() {
    try {
      const userId = getUserId()
      console.log(userId)
      const res = await getProfile(userId)
      console.log(res.data)
      this.setState({user: res.data })
    } catch(err) {
      console.log(err)
    }
  }

  handleLogout = () => {
    logout()
    notify('Come back Soon')
    this.props.history.push('/login')
  }
  
  render() {
    return (
      <nav className="navbar is-dark">
        <ToastContainer/>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/home" className="logo-button" ><img className="logo-picture" src={require('../../assets/dumbbell.png')} alt="logo"/>Spot.me</Link>
            <Link to="/" className="navbar-item"></Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
            {isAuthenticated() && <Link to="/home" className="navbar-button"><img src={require('../../assets/color.png')} alt="home" /></Link>}
            {isAuthenticated() && <Link to="" className="navbar-button"><img src={require('../../assets/alarm.png')} alt="notification"/></Link>}
            {isAuthenticated() && <Link to="/locations" className="navbar-button"><img src={require('../../assets/travel.png')} alt="location" /></Link>}
            {!isAuthenticated() && <Link to="/register" className="other-button">Sign Up</Link>}
            {!isAuthenticated() && <Link to="/login" className="navbar-button"><img src={require('../../assets/multimedia.png')} alt="login" /></Link>}
            {isAuthenticated() && <Link to={`/profile/${getUserId()}`} className="profile-button"><img 
                className="profile-picture"
                loading='lazy'
                src={this.state.user.image}
                alt="profile" 
              />{this.state.user.firstName}</Link>}
            {isAuthenticated() && <Link to="" className="navbar-button"><img src={require('../../assets/cogwheel.png')} alt="settings" /></Link>}
            {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-button"><img src={require('../../assets/signs.png')} alt="logout" /></span>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
} 

export default withRouter(Navbar)