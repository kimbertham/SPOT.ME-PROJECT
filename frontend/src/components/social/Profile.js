import React from 'react' 
import Post from './Post'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'
import ProfileSidebar from './ProfileSidebar'
import ProfilePosts from './ProfilePosts'
import NewsFeedsCard from './NewsFeedsCard'

class Profile extends React.Component {
state = {
  user : {},
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

//* moved into sidebar
// setModal =() => {
//   this.setState({ modal : true})
// }
// hideModal = () => {
//   this.setState({modal:false})
// }

  render(){
    // console.log(this.state)
    return (
      <div className='profile-page-container'>
        
      <ProfileSidebar 
      // * moved this into ProfileSidebar - tom
      // modal={this.state.modal}
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

      <ProfilePosts 
      posts={this.state.user.posts}
      user={this.state.user.id}
      username={this.state.user.username}
      test={this.test}/>


      </div>

    </div>

      </div>
    )
  }
}

export default Profile