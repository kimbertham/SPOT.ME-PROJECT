import React from 'react' 
import Post from './Post'
import axios from 'axios'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'
import ProfileSidebar from '../common/ProfileSidebar'
import FriendsSidebar from '../common/FriendsSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import { withHeaders } from '../../lib/api'
import { getUserId } from '../../lib/auth'

class Profile extends React.Component {
state = {
  user: {},
  modal: false,
  data : {
    content: ''
  },
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
    
    this.setState( { user: res.data }) 
  } catch (err) {
    console.log(err)
  }
}

handleChange = event => {
  const data = { ...this.state.data, [event.target.name]: event.target.value }
  this.setState({ data })
}

  postAComment = async (postOwner, postId) => {
    console.log(this.state)
  const userId= getUserId()
  const res = await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
  const content = res.data
}

setModal =() => {
  this.setState({ modal: true })
}
hideModal = () => {
  this.setState({ modal: false })
}

render(){
  // console.log(this.state)
  // console.log(this.props)
  return (
    <div className='profile-page-container'>
        
      <ProfileSidebar 
        modal={this.state.modal}
        setModal={this.setModal}
        hideModal={this.hideModal}
        user={this.state.user.id}/>

      <div className='mid-section'>

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
            comment={this.postAComment}
            change={this.handleChange}
          />


        </div>
      </div>
      <FriendsSidebar/>

    </div>
  )
}
}

export default Profile