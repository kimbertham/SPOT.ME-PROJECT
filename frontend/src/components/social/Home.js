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
      const res = await getProfile(getUserId())
      this.setState( { user: res.data }) 
    }

    async componentDidMount() {
      const postRes = await axios.get('/api/news', withHeaders())
      await this.getData()
      const postsArray = postRes.data
      this.setState({ postsArray })
    }


    
    addLike = async (postId) => {
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
      console.log(this.state)
      const content = this.state.data
      await postAComment(postOwner,postId, content)
      const res = await getProfile(userId)
      this.setState( { user: res.data }, ()=> {
        console.log(this.state)
      })  
    }
    
    commentDelete = async (postId, commentId) => {
      const userId = getUserId()
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
            setModal={this.setModal}
            hideModal={this.hideModal}
            user={this.state.user.id}/>

          <div className='mid-section'>

            <div className='profile-post'>
              <Post 
                user={this.state.user}
                refresh={this.getData}
              />

              {posts.slice(0).reverse().map((post, i) => { 
                //get owner from get userById
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