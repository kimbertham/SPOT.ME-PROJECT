import React from 'react' 
import Post from './Post'
import axios from 'axios'
import ProfileInfo from '../social/ProfileInfo'
import FriendsSidebar from '../common/FriendsSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import ProfileSidebar from './ProfileSidebar'
import { getProfile, getLike, commentADelete, deleteAPost, postAComment } from '../../lib/api'
import { getUserId } from '../../lib/auth'



class Profile extends React.Component {
state = {
  user: {}, 
  data: {
    content: ''
  },
  modal: false,
  index: null,
  postsUser: {}
}

async componentDidMount() {
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  this.setState( { user: res.data }) 
  try {
  } catch (err) {
    console.log(err)
  }
}

addLike = async (postId) => {
  const userId = this.props.match.params.userId
  await getLike(userId, postId)
  const res = await getProfile(userId)
  this.setState({  user :res.data  }, () => { console.log(this.state.user)})   
}

handleChange = event => {
  const data = 
  { ...this.state.data, [event.target.name]: event.target.value }
  this.setState( { data } )
}

postComment = async ( postOwner, postId) =>{
  const content = this.state.data
  await postAComment(postOwner,postId, content)
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  this.setState( { user: res.data })  
}

commentDelete = async (postId, commentId) => {
  const userId=getUserId()
  commentADelete( userId ,postId,commentId)
  const res = await getProfile(userId)
  this.setState( { user: res.data })  
}

deletePost = async (postId) => {
  const userId = getUserId()
deleteAPost(userId, postId)
  const res = await getProfile(userId)
  this.setState( { user: res.data })  
}

setIndex = async (i) => {
  await this.setState({index: i})
}

render(){
  const { user } = this.state
  const posts = user.posts ? user.posts : []
  console.log(this.state)
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
            refresh={this.getData}
          />

      {posts.slice(0).reverse().map((post, i) => {
          return <NewsFeedsCard
            post={post}
            user={this.state.user}
            like={this.addLike}
            comment={this.postComment}
            change={this.handleChange}
            key={`profile${post._id}`}
            commentDelete={this.commentDelete}
            deletePost={this.deletePost}
            showLikes={this.showLikes}
            setIndex={this.setIndex}
            i={i}
            indexState={this.state.index}
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