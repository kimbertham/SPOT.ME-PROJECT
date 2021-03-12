import React from 'react'
import { getUserId } from '../../lib/auth'
import GroupEdit from './GroupEdit'

class GroupInfo extends React.Component {
  state = {
    modal: false
  }


toggleModal = () => this.setState({ modal: !this.state.modal })




  render() {
    const { group } = this.props
    const membersLength = group.members ? group.members.map(member => member.id) : ''
    console.log(membersLength);

  
  return ( 
    <div className='profile-info-container'>
      <div className='profile-info-section'>
        <div className={group.owner === getUserId() ? 'display-block' : 'display-none'}>
          <div>
            <img className='edit-profile'
              src='https://i.imgur.com/8o2WJAN.jpg'
              alt='edit-icon'
              onClick={this.toggleModal} /></div>
        </div>


        <div className='info-top'>
          <div className='follower-count'>
            <p>{membersLength.length > 0 ? membersLength.length : 0}</p>
            <p>Member{membersLength === 1 ? '' : 's'}</p>
          </div>
          <div className='profile-pic-container'>
            <img className='profile-pic' src={group.image} alt='profile-pic' />
          </div>
          <div className='button-container'>
            <button onClick={membersLength.includes(this.props.user.id) ? this.props.leave : this.props.join} className='group-follow-button'> {membersLength.includes(this.props.user.id) ? 'Leave Group' : 'Join Group'} </button>
          </div>
        </div>

        <div className='info-bottom'>
          <div className='info-text'>
            <div className='username'>
              <h1>{group.name}</h1>
            </div>
            <p> {group.description}</p>
          </div>
          
              <GroupEdit 
                {...group}
                handleEdit={this.props.handleEdit}
                toggleModal={this.toggleModal}
                modal={this.state.modal}/>
           
        </div>
      </div>
    </div>
  )
}
  }


export default GroupInfo