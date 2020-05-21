import React from 'react'

function GroupInfo(props) {
  


    const {group} = props
    const members = group.members
    
    if(!group) {
      console.log('nothing');
      return
    }

    const membersIdArray = members?  members.map(member => {
      return member._id
    }) : ''
    console.log(membersIdArray);
    console.log(membersIdArray.includes( props.user.id));
    
    
  return (
    <div className='profile-info-container'>

      <div className='profile-info-section'>

      <img className='edit-profile' src='https://i.imgur.com/8o2WJAN.jpg' alt='edit-icon'/>

      <div className='info-top'>
        <div className='follower-count'>
          <p>{membersIdArray.length}</p>
          <p>Member{membersIdArray.length === 1? '' : 's'}</p>
        </div>
        <div className='profile-pic-container'>
          <img className='profile-pic' src={group.image} alt='profile-pic'/>
        </div>
          <div className='button-container'>
          <button  onClick = {membersIdArray.includes( props.user.id)? props.leave : props.join } className='follow-button'> {membersIdArray.includes( props.user.id)? 'Leave Group' : 'Join Group'} </button>
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


export default GroupInfo