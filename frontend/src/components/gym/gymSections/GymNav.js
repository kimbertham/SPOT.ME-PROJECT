import React from 'react' 



const GymNav = ({getSection}) => {

  return (
    <div className='gym-navbar'>
    <div onClick={() => getSection('info')} className='nav-field'>Info</div>
    <div onClick={() => getSection('reviews')} className='nav-field'>Reviews</div>
    <div onClick={() => getSection('members')} className='nav-field'>Members</div>
    <div onClick={() => getSection('directions')} className='nav-field'>Directions</div>  
    </div>
  )
}

export default GymNav