import React from 'react'
import ProfileGroups from './ProfileGroups'


class profileSidebar extends React.Component {
  state={
  }


  render() {
  return (

<div className='profile-sidebar'>
  <div className='events-container'>
    <div className='sidebar-head'> 
    <h1>Events</h1>
    <p>+ New Event</p>
    </div>
  </div>

  <div className='groups-container'>
  <div className='sidebar-head'> 
    <h1>My Groups</h1>
    <p onClick={this.props.setModal}>+ New Group</p>
    </div>

      <ProfileGroups 
      user={this.props.user}
      groups={this.props.groups}
      setModal={this.props.setModal}
      hideModal={this.props.hideModal}
      modal={this.props.modal}/>
      </div>
    </div>





    )
  } 
}
export default profileSidebar