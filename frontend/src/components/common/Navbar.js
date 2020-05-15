import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component{
  
  
  render() {
    return (
      <nav>
        <div>
            <button><Link to="/locations"></Link>locations</button>
            <button><Link to="/login">Log In</Link></button>
            <button><Link to="/register">Sign Up</Link></button>
        </div>
      </nav>
    )
  }
} 
export default withRouter(Navbar)