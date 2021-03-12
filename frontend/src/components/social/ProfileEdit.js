import React from 'react'
import axios from 'axios'
import ProfileEdit from './ProfileEdit'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../lib/notifications'
import { followAUser } from '../../lib/api'
import { getUserId } from '../../lib/auth'
const defaultImage = 'https://bit.ly/3g47LRX'



class ProfileInfo extends React.Component {
  state ={
    showFollowers: false,
    modal: false
  }

  toggleModal = () => this.setState({ modal: !this.state.modal })



    followUser = async () =>{
      const userId = this.props.user.id
      const message = await followAUser(userId)
      // notify(message.data)
    // this.setState({ showFollowers: !this.state.showFollowers })
  }

    showFollowers = (value ) => {
    this.setState({showFollowers: value})
    }

  render () {
    const {user, move, currentUser} = this.props
    const followers = user.followers? user.followers : []
    const modalClassName = this.state.showFollowers? 'display-block' : 'display-none'
    const followingArray = currentUser.following? currentUser.following : []
    return (
      <div className='profile-info-container'>
        <div className='profile-info-section'>
          <div className={currentUser.id === user.id ? 'display-block' : 'display-none'}>
          <div>
            <img className='edit-profile'
              src='https://i.imgur.com/8o2WJAN.jpg'
              alt='edit-icon'
              onClick={this.toggleModal} /></div>
          </div>
          <div className='info-top'>

          <div className='follower-count'>  
            <div onClick={()=>{this.showFollowers(true)}} 
            className='followers-icon profile-followers'></div> 
            <div className='followers-number'><p>{followers.length}</p></div>
            <div className={'modal'}></div>


              {/* //! Modal Followers */}
              <div className={`modal ${modalClassName}`}>
                <div className='modal-pop modal-followers'>
                  <div 
                    onClick={()=>this.showFollowers(false)} 
                    className='back-cross'>X</div>
                  <h1 
                    className='follower-title'>
                    {`${user.firstName}'s Followers`} 
                  </h1>
        
                  {followers.length > 0? followers.map((follower, i) => {
                      return <div 
                      onClick={()=>{this.setState( {showFollowers:false}, () => move(follower) )}} 
                      className='followers-field'>
                      <img alt='follower-img' className='follower-img'
                        src={follower.image?`${follower.image}` : defaultImage } />
                      <p>{`${follower.firstName} ${follower.lastName}`}</p>
                    </div>
                    }) : 
                  <p style={{ color: 'red' }}>'no followers to show' </p> }

              </div>
            </div>
          </div>
{/* //!--------------------- */}

        <div className='profile-pic-container'>
        <img className='profile-pic' 
        src={user.image? user.image : defaultImage}  
        alt='profile-pic'/>
        </div>
          <div className='button-container'>
          <button 
          onClick={this.followUser} 
          className={`follow-button ${currentUser.id === user.id ? 'display-none' : 'display-block'}`}>
            {followingArray.includes(user.id)? <p>Unfollow </p> : <p>Follow </p>}
            </button>
            </div>
          </div>

          <div className='info-bottom'>
            <div className='info-text'>
              <div className='username'>
                <h1>{user.firstName} {user.lastName}</h1>
                <p>@{user.username}</p>
                <p>{user.level}</p>
              </div>
              <p> {user.description ? user.description : ' '}</p>
            </div>
            <ProfileEdit 
                {...user}
                handleEdit={this.props.handleEdit}
                toggleModal={this.toggleModal}
                modal={this.state.modal}/>
          </div>
        </div> 
      </div>



    )
  }
}

export default ProfileInfo