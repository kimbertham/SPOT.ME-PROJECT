import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../lib/notifications'
import { Link, withRouter } from 'react-router-dom'
import { getUserId, isAuthenticated, logout } from '../../lib/auth'

class Navbar extends React.Component{

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
            <Link to="/" className="navbar-item"></Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
<<<<<<< HEAD
              <Link to="/locations" className="navbar-item">locations</Link>
              <Link to="/register" className="navbar-item">Register</Link>
              <Link to="/login" className="navbar-item">Log In</Link>
              <Link to={`/profile/${getUserId()}`} className="navbar-item">Profile</Link>
              <Link to="/home" className="navbar-item">Home</Link>
=======
            {isAuthenticated() && <Link to="/locations" className="navbar-item">locations</Link>}
            {!isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
            {!isAuthenticated() && <Link to="/login" className="navbar-item">Log In</Link>}
            {isAuthenticated() && <Link to={`/profile/${getUserId()}`} className="navbar-item">Profile</Link>}
            {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item">Logout</span>}
>>>>>>> seeds
            </div>
          </div>
        </div>
      </nav>
    )
  }
} 

export default withRouter(Navbar)