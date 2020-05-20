import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { getUserId } from '../../lib/auth'

class ProfileInfo extends React.Component {
  state ={
    showFollowers: false
  }

    followUser = async () =>{
      const userId = this.props.user.id
    await axios.put(`/api/profile/${userId}/follow`, '' ,
    { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`} }
    )
  }

  showFollowers = (value ) => {
    console.log('clicked')
  this.setState({showFollowers: value})
  }

  render () {
    const {user} = this.props
    const followers = user.followers? user.followers : []
    const modalClassName = this.state.showFollowers? 'display-block' : 'display-none'
    const currentUser = getUserId()
    const profileUser = this.props.user.id

  return (

    <div className='profile-info-container'>
      <div className='profile-info-section'>
        <div className={currentUser === profileUser? 'display-block' : 'display-none'}>
      <Link to={`/profile/${user.id}/edit`}> 
      <img className='edit-profile' src='https://i.imgur.com/8o2WJAN.jpg' alt='edit-icon'/></Link>
      </div>
        <div className='info-top'>

          <div className='follower-count'>  
            <div onClick={()=>this.showFollowers(true)} className='followers-icon profile-followers'></div> 
            <div className={'modal'}></div>
              <div className='followers-container'>
                <div className={`modal ${modalClassName}`}>
                  <div className='modal-group'>
                <div onClick={()=>this.showFollowers('')} className='back-cross'>X</div>
                {followers.length > 0? followers.map(follower => {
                return <div className='followers-field'>
                  <img src={`${follower.image}`} alt='follower-img'/>
                  <p>{`${follower.firstName} ${follower.lastName}`}</p>
                  </div>
                }) : <p style={{ color: 'red' }}>'no followers to show' </p> }
                </div>
              </div>
            </div>
        </div>

        <div className='profile-pic-container'>
          <img className='profile-pic'src={user.image}  alt='profile-pic'/>
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
          <p>{user.level}</p>
          </div>
          <p> {user.description? user.description : ' '}</p>
      </div>
      </div>
      </div> 
    </div>



  )
  }
}

export default ProfileInfo