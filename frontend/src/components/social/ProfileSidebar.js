import React from 'react'


const profileSidebar = () => {
return (

/* {this.props.events.map(event => {
  return 
})} */


<div className='profile-sidebar'>

  <div className='events-container'>
    <h1>Events</h1>
    <div className='sidebar-field'>
      <img className='sidebar-img' src={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} alt='profile-pic'/>
      <div className='sidebar-text'>
        <p> 'user.events.name'</p>
      </div>
    </div>
  </div>


{/* {this.props.groups.map(group => {
  return 
})} */}
  <div className='groups-container'>
    <h1>Groups</h1>
    <div className='sidebar-field'>
      <img className='sidebar-img' src={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} alt='profile-pic'/>
      <div className='sidebar-text'>
        <p> 'user.groups.name'</p>
      </div>
    </div>
  </div>


</div>
)
} 
export default profileSidebar