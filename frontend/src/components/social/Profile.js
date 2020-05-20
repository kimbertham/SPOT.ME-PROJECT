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
  modal: false,

  data: {
    content: ''
  },

  toggleLike: false
}


async postAComment(postOwner, postId) {
  const res = await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
  console.log(res)
  this.setState({user: res.data})
  // this.state.commentPosted === false ? this.setState({ commentPosted: true }) : this.setState({ commentPosted: false })
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
  const userId = getUserId()
  const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
  const user = res.data
  // const user = {...this.state.user, [this.state.posts]: postData}
  this.setState( { user })   
}



setModal =() => {
  this.setState({ modal: true })
}
hideModal = () => {
  this.setState({ modal: false })
}

render(){
  return (
    <div className='profile-page-container'>
        
      <ProfileSidebar 
        modal={this.state.modal}
        setModal={this.setModal}
        hideModal={this.hideModal}
        user={this.state.user.id}/>

<<<<<<< HEAD
      <div className='right-section'>
=======
      <div className='mid-section'>

>>>>>>> e4d42d5b01f3dd51564a1579594655fb833bfb67
        <div className='profile-info-component'>
          <ProfileInfo 
            user={this.state.user}/>
        </div>
        <div className='profile-post'>
          <Post 
            user={this.state.user}
          />
<<<<<<< HEAD
          <NewsFeedsCard 
=======

          <NewsFeedsCard
>>>>>>> e4d42d5b01f3dd51564a1579594655fb833bfb67
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