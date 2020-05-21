import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

class SearchBar extends React.Component {
  state = {
    input: '',
    users: [],
    groups: []
  }

handleInput = async({ target }) => {
  const value = target.value
  if (value !== ''){
    const res = await axios.get(`/api/search/${value}`)
    this.setState({
      input: value,
      users: res.data.users,
      groups: res.data.groups
    })
  } else {
    this.setState({
      input: value,
      users: [],
      groups: []
    })
  }
   
}

// imageStyles = {
//   width: 10px,
//   height: 10px
// }


render(){
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <input type='text' value={this.state.input} placeholder='Looking for something?' onChange={this.handleInput} />
      <div className="navbar-dropdown is-boxed">
        {this.state.users.map(user => {
          return (
            <div className="navbar-item">
              <Link to={`/profile/${user._id}`}>
              
                <img 
                  className="profile-picture"
                  loading='lazy'
                  src={user.image} 
                  alt="logo" 
                />
                <div className="field">
                  <p className="">{user.username}</p>
                  <hr className="navbar-divider" />
                </div>
              </Link>
            </div>
          )
        })}
        { this.state.groups.length > 0 ? <div className="navbar-item">Groups</div> : ''}
        {this.state.groups.map(group => {
          return (
            <div className="navbar-item">
              <Link to={`/groups/${group._id}`}>
                <img 
                  className="profile-picture"
                  loading='lazy'
                  src={group.image} 
                  alt="logo" 
                />
                <div className="field">
                  <p className="">{group.name}</p>
                  <hr className="navbar-divider" />
                </div>
              </Link>
            </div>
          )
        })}
          
        
      </div>
    </div>
  )
}


}

export default withRouter(SearchBar) 



