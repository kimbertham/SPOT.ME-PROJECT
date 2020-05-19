// import React from 'react'
// import ImageUpload from '../common/ImageUpload'
// import { postContent } from '../../lib/api'
 
// // * props: user
// class Post extends React.Component {
// state = {
//   formData: {
//     content: ''
//   }
// }

// clearPost = () => {
//   // * clears state but doesn't clear the input box
//   const formData = { formData: { content: '' } }
//   this.setState({ formData })
//   // console.log(this.state.formData)
// }

// handleChange = event => {
//   const formData = { ...this.state.formData, [event.target.name]: event.target.value }
//   this.setState({ formData })
// }

// handleSubmit = async event => {
//   event.preventDefault()
//   try {
//     await postContent(this.state.formData, this.props.user.id)
//     console.log('Post sent!')
//     this.clearPost()
    
    
//   } catch (err) {
//     console.log(err)
//   }
// }

// render() {
//   if (this.props.user === {}) return null

//   return (
//     <section className="wrap-center">
//       <div className="post-container is-half">
//         <form onSubmit={this.handleSubmit}>

//           <div className="top-section">
//             <figure className="picture">
//               <img 
//                 className="profile-picture"
//                 loading='lazy'
//                 src={this.props.user.image} 
//                 alt="logo" 
//               />
//             </figure>
          
//             <div className="field">
//               <textarea
//                 className="textarea"
//                 name="content"
//                 value={this.state.formData.content}
//                 placeholder="Want to post something?"
//                 onChange={this.handleChange}
//               />
//             </div>
//           </div>

//           <div className="bottom-section">
//             <div className="field center-items">
//               <div className="control center-items">

//                 {/* //* can't get upload to work */}
//                 <ImageUpload 
//                   name="content"
//                 />

//                 <button
//                   className="custom-button"
//                   type="submit"
//                   value="submit"
//                   onClick={this.handleSubmit}
//                 >
//                   <img src={require('../../assets/send.png')} alt="submit" width="40px"/>
//                 Post
//                 </button>

//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }
// }

// export default Post