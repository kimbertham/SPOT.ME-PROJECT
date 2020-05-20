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
// import express from 'express'

class Profile extends React.Component {
state = {
  user: {},

  data: {
    content: ''
  },
  
  modal: false,
  toggleLike: false
}

postAComment = async ( postOwner, postId) =>{
  console.log(this.state)
  const response = await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
  const userId = this.props.match.params.userId
  const res = await getProfile(userId)
  this.setState( { user: res.data })  

}

  handleChange = event => {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState( { data } )
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
<<<<<<< HEAD
  const userId = getUserId()
  const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
  const user = res.data
  this.setState( { user })   
=======
  try {
    const userId = getUserId()
    const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' ,  withHeaders() )
    
    this.setState( { user: res.data }) 
  } catch (err) {
    console.log(err)
  }
>>>>>>> d5bce1a3b039a644102d8965887f37649b40cb0d
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
        console.log(post._id)
          return <NewsFeedsCard
            post={post}
            user={this.state.user}
            like={this.addLike}
            comment={this.postAComment}
            change={this.handleChange}
            key={`profile${post._id}`}
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