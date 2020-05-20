import React from 'react'
import axios from 'axios'
import { getProfile } from '../../lib/api'
import { withHeaders } from '../../lib/api'
import { getUserId } from '../../lib/auth'

class FriendsSidebar extends React.Component {

  state = {
    user : {},
    modal: false
  }

  async componentDidMount() {
    try {
      const res = await getProfile(getUserId)
      this.setState( { user: res.data })   
    } catch (err) {
      console.log(err)
    }
  }

toggleModal = () => this.setState({ modal : !this.state.modal })

  render() {
    const { user, modal } = this.state

  return (
<div className="right-section">
  <div className='sidebar-head'> 
    <h3>Contacts</h3>
  </div>
  <div className="friends-list">
    { user.following ? user.following.map(friend => {
    return <div 
            key={friend.id} 
            className="friend"
            >
              <img 
                className='group-icon' 
                src={ friend.image ? friend.image : '../../assets/dumbell.png'} 
                alt='friend'
              />              
          <p>{ friend.username }</p>
            </div>
    }) : null }
  </div>
</div>
    )
  } 
}

export default FriendsSidebar