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

render(){
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <input type='text' className='searchBarNav' value={this.state.input} placeholder='Looking for something?' onChange={this.handleInput} />
      { this.state.input !== '' ? <div className="navbar-dropdown is-boxed">
      { this.state.users.length > 0 && this.state.users.length > 0  ? '' : <div className="navbar-item centered"><p>No Results</p></div>}
      { this.state.users.length > 0 ? <div className="navbar-item centered"><p>People</p></div> : ''}
        {this.state.users.map(user => {
          return (
            <div className="navbar-item ">
            
              <Link className='inline-link' to={`/profile/${user._id}`}>
              
                <img 
                  className="searchbar-profile-picture"
                  loading='lazy'
                  src={user.image} 
                  alt="logo" 
                />
                <div className="field field-searchbar-item">
                  <p className="">{user.username}</p>
                  <hr className="navbar-divider" />
                </div>
              </Link>
              
            </div>
          )
        })}
        { this.state.groups.length > 0 ? <div className="navbar-item centered"><p>Groups</p></div> : ''}
        {this.state.groups.map(group => {
          return (
            <div className="navbar-item">
              <Link className='inline-link' to={`/groups/${group._id}`}>
                <img 
                  className="searchbar-profile-picture"
                  loading='lazy'
                  src={group.image} 
                  alt="logo" 
                />
                <div className="field field-searchbar-item">
                  <p className="">{group.name}</p>
                  <hr className="navbar-divider" />
                </div>
              </Link>
            </div>
          )
        })}
          
        
      </div> : ''}
      
    </div>
  )
}


}

export default withRouter(SearchBar) 



