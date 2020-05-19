import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class GroupInfo extends React.Component {
  

  //   followUser = async () =>{
  //     const userId = this.props.user.id
  //   await axios.put(`/api/profile/${userId}/follow`, '' ,
  //   { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`} }
  // )
  // // this.props.history.push(`/profile/${userId}`)
  // }

  render () {
    const {group} = this.props
  return (

    <div className='profile-info-container'>

      <div className='profile-info-section'>

      <img className='edit-profile' src='https://i.imgur.com/8o2WJAN.jpg' alt='edit-icon'/>

      <div className='info-top'>
        <div className='follower-count'>
          <p>{group.members.length}</p>
        </div>
        <div className='profile-pic-container'>
          <img className='profile-pic' src='https://i.imgur.com/8o2WJAN.jpg' alt='profile-pic'/>
        </div>
          <div className='button-container'>
          <button className='follow-button'> Follow </button>
          </div>
      </div>

      <div className='info-bottom'>
        <div className='info-text'>
        <div className='username'>
          <h1>{group.name}</h1>
          </div>
          <p> {group.description}</p>
      </div>
      </div>
      </div>
    </div>



  )
  }
}

export default GroupInfo