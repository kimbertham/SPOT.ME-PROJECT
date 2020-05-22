import React from 'react'
import axios from 'axios'
import { getUserId } from '../../lib/auth'
import ProfileSidebar from '../common/ProfileSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import FriendsSidebar from '../common/FriendsSidebar'
import Post from './Post'
import { withHeaders, getProfile, getLike, 
  commentADelete, deleteAPost, postAComment } from '../../lib/api'

class Home extends React.Component {
  state = {
    user: {},
    data: {
      content: ''
    },
    modal: false,
    index: null,
    postsArray: [],
    currentUser: ''
  }
  
  //! get newsfeed Array

    getData = async () => {
      let postsArray = []
      const postRes = await axios.get('/api/news', withHeaders())
      const getPostsArray = postRes.data.slice(0).reverse()
        getPostsArray.map(user => {
        user.map(post => {
          postsArray.push(post)
        })
      })
      const getCurrentId = await getUserId()
      const getCurrentProfile = await getProfile(getCurrentId)
      const currentUser = getCurrentProfile.data
      this.setState({ postsArray, currentUser})
    }

    commentDelete = async (postId, postOwnerId, commentId) => {
      console.log(postOwnerId)
      commentADelete( postOwnerId ,postId,commentId)
      this.getData() 
    }

    async componentDidMount() {
    await this.getData()
    }

    addLike = async (userId, postId) => {
      await getLike(userId, postId)
      const res = await axios.get('/api/news', withHeaders())
      const postsArray = res.data.slice(0).reverse()
      this.getData()
      // this.setState({ postsArray })   
      // this.getData()  
    }
    
    handleChange = event => {
      const data = 
      { ...this.state.data, [event.target.name]: event.target.value }
      this.setState( { data } )
    }
    
    postComment = async ( postOwner, postId, userId) =>{
      console.log(this.state)
      const content = this.state.data
      await postAComment(postOwner,postId, content)
      this.getData()
    }
    
    movePage = async (follower) => {
      this.props.history.push(`/profile/${follower.id}`)
      const data = await getProfile(follower.id)
      const user = data.data
      await this.setState({ user })
    }

    setIndex = async (i) => {
      await this.setState({ index: i })
    }

    

    //! ---------------------------

    render() {
      const { postsArray } = this.state
      const posts = postsArray ? postsArray : []
      console.log(postsArray)
      return (
        <div className='profile-page-container'>
        
          <ProfileSidebar 
            modal={this.state.modal}
            user={this.state.user.id}/>

          <div className='mid-section'>
            <div className='profile-post'>

              <Post 
                user={this.state.user}
                refresh={this.getData}
                currentUser={this.state.currentUser}
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
                  currentUser={this.state.currentUser}/>
              })}
            </div>
          </div>
          <FriendsSidebar/>
        </div>
      )
    }
}
export default Home