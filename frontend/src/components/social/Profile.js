import React from 'react' 
import Post from './Post'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'
import ProfileSidebar from './ProfileSidebar'
import NewsFeedsCard from './NewsFeedsCard'

class Profile extends React.Component {
state = {
  user: {}
}

async componentDidMount() {
  // const {user} = this.props
  try {
    const userId = this.props.match.params.userId
    const res = await getProfile(userId)
    this.setState( { user: res.data })   
  } catch (err) {
    console.log(err)
  }
}

<<<<<<< HEAD
render(){
  return (
    <div>
      <Post 
        user={this.state.user}
      />
    </div>
  )
}
=======
  render(){
    console.log(this.state)
    return (
      <div className='profile-page-container'>
        
      <ProfileSidebar />

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
        />
      </div>

    </div>

      </div>
    )
  }
>>>>>>> 93aac6e06bc8847df1568b853d689eadb746a7a9
}

export default Profile