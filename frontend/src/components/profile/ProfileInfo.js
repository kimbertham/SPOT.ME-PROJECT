import React from 'react'
import { defaultImage } from '../../lib/common'


const ProfileInfo = ( { user, setModal, current, followUser } ) => {

  return (
    <div className='p-info-cont'>

      <div className='p-followers-cont' onClick={() => setModal('followers')}>  
        <img src={'https://i.imgur.com/dmix3Do.jpg'} className='p-followers' alt='p-followers'/>
        <p>{user.followers ? user.followers.length : null} </p>
      </div>

      <div className='p-info'>
        <img  src={user.image ? user.image : defaultImage} className='profile-pic' alt='profile-pic'/>
        <div>
          <h1>{user.firstName} {user.lastName}</h1>
          <p>@{user.username}</p>
          <p>{user.level}</p>
          <p> {user.description ? user.description : ' '}</p>
        </div>

        <button onClick={() => followUser(user.id)} className={current.id === user.id ? 'display-none' : 'follow-button'}>
          {current.following.includes(user.id) ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      <div className='p-edit-cont'  onClick={() => setModal('edit')}>
        <img src='https://i.imgur.com/8o2WJAN.jpg' alt='edit-icon' 
          className={current.id === user.id ? 'edit-icon' : 'display-none'} />
      </div>

    </div>
  )
}


export default ProfileInfo