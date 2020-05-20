import React from 'react'
import ImageUpload from '../common/ImageUpload'
<<<<<<< HEAD

// * props: user
class GroupPost extends React.Component {
state = {
  formData: {
    content: ''
  }
=======
import { postContent } from '../../lib/api'
import axios from 'axios'
 
// * props: user
class GroupPost extends React.Component {
state = {
>>>>>>> d5bce1a3b039a644102d8965887f37649b40cb0d
  
}

clearPost = () => {
  // * clears state but doesn't clear the input box
  const formData = { formData: { content: '' } }
  this.setState({ formData })
  // console.log(this.state.formData)
}

// handleSubmit = async event => {
//   event.preventDefault()
//   try {
//     await postContent(this.state.formData, this.props.user.id)
//     console.log('GroupPost sent!')
//     this.clearPost()
    
    
//   } catch (err) {
//     console.log(err)
//   }
// } 

render() {
  if (this.props.group === {}) return null
  // console.log(this.props.group)
  return (
    <section className="post-container">
      
        <form onSubmit={this.props.handleSubmit}>

          <div className="top-section">
            <figure className="picture">
              <img 
                className="profile-picture"
                loading='lazy'
                src={require('../../assets/send.png')} 
                alt="logo" 
              />
            </figure>
          
            <div className="field">
              <textarea
                className="textarea"
                name="content"
                value={this.props.formData.content}
                placeholder="Want to post something?"
                onChange={this.props.handleChange}
              />
            </div>
          </div>

          <div className="bottom-section">
            <div className="field center-items">
              <div className="control center-items">

                {/* //* can't get upload to work */}
                <ImageUpload 
                  name="content"
                />

                <button
                  className="custom-button"
                  type="submit"
                  value="submit"
                  
                >
                  <img src={require('../../assets/send.png')} alt="submit" width="40px"/>
                GroupPost
                </button>

              </div>
            </div>
          </div>
        </form>
      
    </section>
  )
}
}

export default GroupPost