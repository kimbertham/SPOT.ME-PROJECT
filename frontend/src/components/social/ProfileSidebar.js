import React from 'react'
import ProfileGroups from './ProfileGroups'



class profileSidebar extends React.Component {
  // * props: user, groups
  state = {
    user: {},
    modal: false
  }

toggleModal = () => this.setState({ modal: !this.state.modal })

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
          <p onClick={this.toggleModal}>+ New Group</p>
        </div>

        <ProfileGroups 
          user={this.props.user}
          groups={this.groups}
          toggleModal={this.toggleModal}
          modal={this.state.modal}/>

      </div>
    </div>





  )
} 
}
export default profileSidebar