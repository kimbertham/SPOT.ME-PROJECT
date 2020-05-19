import React from 'react' 
import Post from './Post'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'
import ProfileSidebar from './ProfileSidebar'
import ProfilePosts from './ProfilePosts'


class Profile extends React.Component {
state = {
  user : {},
  modal: false
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

setModal =() => {
  this.setState({ modal : true})
}

hideModal = () => {
  this.setState({modal:false})
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