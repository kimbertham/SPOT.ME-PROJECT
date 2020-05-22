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
      const postRes = await axios.get('/api/news', withHeaders())
<<<<<<< HEAD
      const postsArray = postRes.data
      this.setState({ postsArray })
=======
      const res = await getProfile(getUserId())
      const postsArray = postRes.data
      this.setState({ postsArray, user: res.data }) 
>>>>>>> development
    }


    async componentDidMount() {
<<<<<<< HEAD
      const postRes = await axios.get('/api/news', withHeaders())
      const postsArray = postRes.data
      const getCurrentId = await getUserId()
      const getCurrentProfile = await getProfile(getCurrentId)
      const currentUser = getCurrentProfile.data
      currentUser.posts.map(post => {
        postsArray.push(post)
      })
      this.setState({ postsArray, currentUser})
=======
      await this.getData()
>>>>>>> development
    }

    addLike = async (userId, postId) => {
      await getLike(userId, postId)
<<<<<<< HEAD
      const res = await axios.get('/api/news', withHeaders())
      const postsArray = res.data.slice(0).reverse()
      this.setState({ postsArray })   
=======
      this.getData()  
>>>>>>> development
    }
    
    handleChange = event => {
      const data = 
      { ...this.state.data, [event.target.name]: event.target.value }
      this.setState( { data } )
    }
    
<<<<<<< HEAD
    postComment = async ( postOwner, postId, userId) =>{
      console.log(this.state)
      const content = this.state.data
      await postAComment(postOwner,postId, content)
      const res = await axios.get('/api/news', withHeaders())
      const postsArray = res.data.slice(0).reverse()
      this.setState( { postsArray} )  
=======
    postComment = async ( postOwner, postId) =>{
      const content = this.state.data
      await postAComment(postOwner,postId, content)
      await this.getData() 
    }
    
    commentDelete = async (postId, commentId) => {
      const userId = getUserId()
      commentADelete( userId ,postId,commentId)
      this.getData()
    }
    
    deletePost = async (postId) => {
      const userId = getUserId()
      deleteAPost(userId, postId)
      this.getData() 
>>>>>>> development
    }
    
    setIndex = async (i) => {
      await this.setState({ index: i })
    }

    //! ---------------------------

    render() {
      const { postsArray } = this.state
      const posts = postsArray ? postsArray : []
<<<<<<< HEAD
      console.log(postsArray)
=======
      // console.log(posts)
>>>>>>> development
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