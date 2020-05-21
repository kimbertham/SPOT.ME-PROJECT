import React from 'react'
import axios from 'axios'
import { getUserId } from '../../lib/auth'
import ProfileSidebar from '../common/ProfileSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import FriendsSidebar from '../common/FriendsSidebar'
import Post from './Post'
import { withHeaders, getProfile, getLike, 
  commentADelete, deleteAPost, postAComment } from '../../lib/api'
const userId = getUserId()

class Home extends React.Component {
  state = {
    user: {},
    data: {
      content: ''
    },
    modal: false,
    index: null,
    postsArray: []
  }
  
  //! get newsfeed Array

    getData = async () => {
      const postRes = await axios.get('/api/news', withHeaders())
      const res = await getProfile(getUserId())
      const postsArray = postRes.data
      this.setState({ postsArray, user: res.data }) 
    }

    async componentDidMount() {
      await this.getData()
    }

    addLike = async (postId) => {
      await getLike(userId, postId)
      this.getData()  
    }
    
    handleChange = event => {
      const data = 
      { ...this.state.data, [event.target.name]: event.target.value }
      this.setState( { data } )
    }
    
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
    }
    
    setIndex = async (i) => {
      await this.setState({ index: i })
    }

    //! ---------------------------

    render() {
      const { postsArray } = this.state
      const posts = postsArray ? postsArray : []
      // console.log(posts)
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
                  post={post}
                  user={post.owner}
                  like={this.addLike}
                  comment={this.postComment}
                  change={this.handleChange}
                  key={`profile${post._id}`}
                  commentDelete={this.commentDelete}
                  deletePost={this.deletePost}
                  showLikes={this.showLikes}
                  setIndex={this.setIndex}
                  i={i}
                  indexState={this.state.index}/>
              })}
            </div>
          </div>
          <FriendsSidebar/>
        </div>
      )
    }
}
export default Home