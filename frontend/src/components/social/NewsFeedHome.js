// import React from 'react'
// import NewsFeedsCard from './NewsFeedsCard'
// import {withHeaders} from '../../lib/api'
// import {getUserId} from '../../lib/auth'

// class NewsFeedHome extends React.Component{
//   state = {
//     user: {},
  
//     data: {
//       content: ''
//     },
    
//     modal: false,
  
//     index: null
//   }
  
//   async componentDidMount() {
//     try {
//       const userId = this.props.match.params.userId
//       const res = await getProfile(userId)
//       this.setState( { user: res.data })   
//     } catch (err) {
//       console.log(err)
//     }
//   }
  
//   addLike = async (postId) => {
//     const userId = getUserId()
//     const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
//     const user = res.data
//     this.setState( { user })   
//   }
  
//   handleChange = event => {
//     const data = { ...this.state.data, [event.target.name]: event.target.value }
//     this.setState( { data } )
//   }
  
//   postAComment = async ( postOwner, postId) =>{
//   await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
//     const userId = this.props.match.params.userId
//     const res = await getProfile(userId)
//     this.setState( { user: res.data })  
//   }
  
//   commentDelete = async (postId, commentId) => {
//     const userId=getUserId()
//     await axios.delete(`/api/profile/${userId}/post/${postId}/comment/${commentId}`, withHeaders())
//     const res = await getProfile(userId)
//     this.setState( { user: res.data })  
//   }
  
//   deletePost = async (postId) => {
//     const userId = getUserId()
//     await axios.delete(`/api/profile/${userId}/post/${postId}`, withHeaders())
//     const res = await getProfile(userId)
//     this.setState( { user: res.data })  
//   }
  
//   setIndex = async (i) => {
//     await this.setState({index: i})
  
//   }
  
//   setModal =() => {
//     this.setState({ modal: true })
//   }
//   hideModal = () => {
//     this.setState({ modal: false })
//   }
  


//   render() {
//     return (
//       <div className='newsfeed-container'>
//         <div className='newsfeed-right'>

//           <NewsFeedsCard/>
          
//         </div>
//       </div>
//     )
//   }
// }
//  export default NewsFeedHome