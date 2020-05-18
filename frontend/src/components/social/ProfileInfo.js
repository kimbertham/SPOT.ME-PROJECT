import React from 'react'
import axios from 'axios'

class ProfileInfo extends React.Component {
  state ={}

    followUser = () =>{
    const userToFollow = axios.post(`/api/:userId/follow`)
    }


  
  render () {
    const {user} = this.props
  console.log(this.props)
  return (
    <div className='profile-info-container'>
      <div className='profile-info-section'>

      <div className='info-top'>

        <div className='follower-count'>
          <p>9001</p>
        </div>
        
        <div className='profile-pic-container'>
          <img className='profile-pic'src={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} />
        </div>

          <div className='button-container'>
          <button onClick={this.followUser} className='follow-button'> Follow </button>
          </div>
  
      </div>

      <div className='info-bottom'>
        <div className='info-text'>
        <div className='username'>
          <h1>{user.firstName} {user.lastName}</h1>
          <p>@{user.username}</p>
          </div>
          <p> descrition will go here Mollit quis veniam officia ut.</p>
      </div>
      </div>

      </div>

    </div>
  )
  }
}

export default ProfileInfo