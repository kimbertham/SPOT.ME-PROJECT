import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
  this.setState({showFollowers: value})
  }

  render () {
    console.log(this.state)
    const {user} = this.props
    const followers = user.followers? user.followers : []
    const modalClassName = this.state.showFollowers? 'display-block' : 'display-none'
  return (

    <div className='profile-info-container'>
      <div className='profile-info-section'>
      <Link to={`/profile/${user.id}/edit`}> 
      <img className='edit-profile' src='https://i.imgur.com/8o2WJAN.jpg' alt='edit-icon'/></Link>

        <div className='info-top'>


          <div className='follower-count'>  
            <div onClick={()=>this.showFollowers(true)} className='followers-icon profile-followers'></div> 
            <div className='modal'></div>
              <div className='followers-container'>
                <div className={`${modalClassName}`}>
                <div onClick={()=>this.showFollowers('')} className='back-cross'>Xxxx</div>
                {followers? followers.map(follower => {
                return <div className='followers-field'>
                    <img src={`${follower.image}`}/>
                <p>{`${follower.firstName} ${follower.lastName}`}</p>
                  </div>
                }) : ''}
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