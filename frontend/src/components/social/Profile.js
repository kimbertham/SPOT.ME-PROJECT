import React from 'react' 
import Post from './Post'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'
import ProfileSidebar from './ProfileSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import { withHeaders } from '../../lib/api'
import axios from 'axios'
import { getUserId } from '../../lib/auth'

class Profile extends React.Component {
state = {
  user: {},
  modal: false
}

async componentDidMount() {
  try {
    const userId = this.props.match.params.userId
    const res = await getProfile(userId)
    this.setState( { user: res.data })   
  } catch (err) {
    console.log(err)
  }
}


addLike = async (postId) => {
  try {
    const userId = getUserId()
    const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' ,  withHeaders() )
    this.setState({ user: res.data })
  } catch (err) {
    console.log(err)
  }
}



setModal =() => {
  this.setState({ modal: true })
}
hideModal = () => {
  this.setState({ modal: false })
}

render(){
  // console.log(this.state)
  return (
    <div className='profile-page-container'>
        
      <ProfileSidebar 
        modal={this.state.modal}
        setModal={this.setModal}
        hideModal={this.hideModal}
        user={this.state.user.id}/>

      <div className='right-section'>

        <div className='profile-info-component'>
          <ProfileInfo 
            user={this.state.user}/>
        </div>

        <div className='profile-post'>
          <Post 
            user={this.state.user}
          />

          <NewsFeedsCard 
            user={this.state.user}
            like={this.addLike}
          />


        </div>

      </div>

    </div>
  )
}
}

export default Profile