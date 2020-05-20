import React from 'react' 
import Post from './Post'
import axios from 'axios'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'
import FriendsSidebar from '../common/FriendsSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import { withHeaders } from '../../lib/api'
import { getUserId } from '../../lib/auth'

class Profile extends React.Component {
state = {
  user: {},

  data: {
    content: ''
  },
  
  modal: false,
  toggleLike: false
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
  const userId = getUserId()
  const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
  const user = res.data
  this.setState( { user })   
}

handleChange = event => {
  const data = { ...this.state.data, [event.target.name]: event.target.value }
  this.setState( { data } )
}

postAComment = async ( postOwner, postId) =>{
await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  this.setState( { user: res.data })  
}

commentDelete = async (postId, commentId) => {
  const userId=getUserId()
  await axios.delete(`/api/profile/${userId}/post/${postId}/comment/${commentId}`, withHeaders())
  const res = await getProfile(userId)
  this.setState( { user: res.data })  
}

deletePost = async (postId) => {
  const userId = getUserId()
  await axios.delete(`/api/profile/${userId}/post/${postId}`, withHeaders())
  const res = await getProfile(userId)
  this.setState( { user: res.data })  
}

showLikes = () => {
  console.log('clicked')
}


setModal =() => {
  this.setState({ modal: true })
}
hideModal = () => {
  this.setState({ modal: false })
}

render(){
  const { user } = this.state
  const posts = user.posts ? user.posts : []
  return (
    <div className='profile-page-container'>
        
      {/* <ProfileSidebar 
        modal={this.state.modal}
        setModal={this.setModal}
        hideModal={this.hideModal}
        user={this.state.user.id}/> */}

      <div className='mid-section'>

        <div className='profile-info-component'>
          <ProfileInfo 
            user={this.state.user}/>
        </div>
        <div className='profile-post'>
          <Post 
            user={this.state.user}
          />

      {posts.slice(0).reverse().map(post => {
          return <NewsFeedsCard
            post={post}
            user={this.state.user}
            like={this.addLike}
            comment={this.postAComment}
            change={this.handleChange}
            key={`profile${post._id}`}
            commentDelete={this.commentDelete}
            deletePost={this.deletePost}
            showLikes={this.showLikes}
          />
        })}


        </div>
      </div>
      <FriendsSidebar/>

    </div>
  )
}
}

export default Profile