// import React from 'react' 
// import Post from './Post'
// import { getProfile } from '../../lib/api'
// import ProfileInfo from '../social/ProfileInfo'
// import ProfileSidebar from './ProfileSidebar'
// import NewsFeedsCard from './NewsFeedsCard'
// import { withHeaders } from '../../lib/api'
// import axios from 'axios'
// import { getUserId } from '../../lib/auth'
// // import express from 'express'

// class Profile extends React.Component {
// state = {
//   user: {},
//   modal: false,
//   data: {
//     content: ''
//   }
// }

// async componentDidMount() {
//   try {
//     const userId = this.props.match.params.userId
//     const res = await getProfile(userId)
//     this.setState( { user: res.data })   
//   } catch (err) {
//     console.log(err)
//   }
// }

// addLike = async (postId) => {
//   const userId = getUserId()
//   const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
//   this.setState({ user: res.data })
// }

//   postAComment = async (postOwner, postId, e) => {
//     e.preventDefault()
//     const res = await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
//     this.state.comment === false ? this.setState({ comment: true }) : this.setState({ comment: false })
//   }

//     handleChange = event => {
//       const data = { ...this.state.data, [event.target.name]: event.target.value }
//       this.setState( { data } )
//     }


// setModal =() => {
//   this.setState({ modal: true })
// }
// hideModal = () => {
//   this.setState({ modal: false })
// }

// render(){
//   return (
//     <div className='profile-page-container'>
        
//       <ProfileSidebar 
//         modal={this.state.modal}
//         setModal={this.setModal}
//         hideModal={this.hideModal}
//         user={this.state.user.id}/>

//       <div className='right-section'>
//         <div className='profile-info-component'>
//           <ProfileInfo 
//             user={this.state.user}/>
//         </div>
//         <div className='profile-post'>
//           <Post 
//             user={this.state.user}
//           />
//           <NewsFeedsCard 
//             user={this.state.user}
//             like={this.addLike}
//             comment={this.postAComment}
//             change={this.handleChange}
//           />
//         </div>

//       </div>

//     </div>
//   )
// }
// }

// export default Profile