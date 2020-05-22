import React from 'react' 
import Post from './Post'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import ProfileInfo from '../social/ProfileInfo'
import FriendsSidebar from '../common/FriendsSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import ProfileSidebar from '../common/ProfileSidebar'
import { getProfile, getLike, commentADelete, deleteAPost, postAComment } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../lib/notifications'

class Profile extends React.Component {
state = {
  user: {}, 
  data: {
    content: ''
  },
  modal: false,
  index: null,
currentUser : {}
}

async componentDidMount() {
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  const getCurrentId = await getUserId()
  const currentUser = await getProfile(getCurrentId)
  await this.setState( { user: res.data, currentUser : currentUser.data  }) 
  this.getData()
  try {
  } catch (err) {
    console.log(err)
  }
}

componentDidUpdate = async (prevProps) => {
  if (prevProps.location.pathname.includes('/profile/') && this.props.location.pathname.includes('/profile/')) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      try {
        const userId = this.props.match.params.userId
        const res = await getProfile(userId)
        const getCurrentId = await getUserId()
        const currentUser = await getProfile(getCurrentId)
        await this.setState( { user: res.data, currentUser : currentUser.data  }) 
        this.getData()
       } catch (err) {
          console.log(err)
        }
      }
  }
}

getData = async () => {
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  this.setState( { user: res.data }) 
}

addLike = async (userId, postId) => {
// addLike = async (postId) => {
  // const userId = this.props.match.params.userId
  await getLike(userId, postId)
  const res = await getProfile(userId)
  this.setState({  user: res.data  })   
}

handleChange = event => {
  const data = 
  { ...this.state.data, [event.target.name]: event.target.value }
  this.setState( { data } )
}

postComment = async ( postOwner, postId) =>{
  const contents = this.state.data
  await postAComment(postOwner,postId, contents)
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  this.setState( { data: {content: ''} , user: res.data })  
}

commentDelete = async (postId, commentId) => {
  const userId = getUserId()
  commentADelete( userId ,postId,commentId)
  await this.getData() 
}

deletePost = async (postId) => {
  const userId = getUserId()
  deleteAPost(userId, postId)
  await this.getData()
}

setIndex = async (i) => {
  this.setState({index: i})
}
movePage = async (follower) => {
  this.props.history.push(`/profile/${follower.id}`)
  const data = await getProfile(follower.id)
  const user = data.data
  await this.setState({ user })
}

profileEditted = async() => {
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  const getCurrentId = await getUserId()
  const currentUser = await getProfile(getCurrentId)
  this.setState( { user: res.data, currentUser : currentUser.data  }) 
}

render(){
  const { user } = this.state
  const posts = user.posts ? user.posts : []
  
  return (
    <div className='profile-page-container'>
      <ToastContainer/>
        <div className='left-section'> 

      <ProfileSidebar 
        modal={this.state.modal}
        user={this.state.user.id}/>
        </div>
      <div className='mid-section'>
        <div className='profile-info-component'>
          <ProfileInfo 
            user={this.state.user}
            move={this.movePage}
            currentUser={this.state.currentUser}
            refresh={this.getData}
            handleEdit={this.profileEditted}
            />
        </div>
        <div className='profile-post'>
          <Post 
            user={this.state.user}
            refresh={this.getData}
          />
      {posts.slice(0).reverse().map((post, i) => {

          return <NewsFeedsCard
          key={`profile${post._id}`}
            post={post}
            like={this.addLike}
            setIndex={this.setIndex}
            comment={this.postComment}
            change={this.handleChange}
            deletePost={this.deletePost}
            commentDelete={this.commentDelete}
            i={i}
            indexState={this.state.index}
            currentUser={this.state.currentUser}
            value={this.state.data.content}
          />
        })}
        </div>
      </div>
      <FriendsSidebar/>
    </div>
  )
}
}
export default withRouter(Profile)