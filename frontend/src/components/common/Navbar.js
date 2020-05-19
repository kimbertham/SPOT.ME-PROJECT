import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUserId } from '../../lib/auth'


class Navbar extends React.Component{
  
  render() {
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item"></Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <Link to="/locations" className="navbar-item">locations</Link>
              <Link to="/register" className="navbar-item">Register</Link>
              <Link to="/login" className="navbar-item">Log In</Link>
              <Link to={`/profile/${getUserId()}`} className="navbar-item">Profile</Link>
              <Link to="/home" className="navbar-item">Home</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
} 

export default withRouter(Navbar)