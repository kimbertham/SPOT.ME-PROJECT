import React from 'react'
import ImageUpload from '../common/ImageUpload'
import { postContent } from '../../lib/api'

class MakePost extends React.Component {
state = {
  formData: {
    content: ''
  }
}

handleChange = event => {
  const formData = { ...this.state.formData, [event.target.name]: event.target.value }
  this.setState({ formData })
}

handleSubmit = async event => {
  event.preventDefault()
  await postContent(this.state.formData, this.props.user.id)
  this.props.refresh(this.props.user.id)
  this.setState({ formData: { content: '' } })
}

render() {

  const { current } = this.props
  if (!current) return null

  return (
    <section className="post-container">
      <form onSubmit={this.handleSubmit}>

        <div className="top-section">
          <figure className="picture">
            <img 
              className="profile-picture"
              loading='lazy'
              src={current.image} 
              alt="logo" 
            />
          </figure>
          
          <div className="field">
            <textarea
              className="textarea "
              name="content"
              value={this.state.formData.content}
              placeholder="Want to post something?"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="bottom-section">
          <div className="field center-items">
            <div className="control center-items">

              <ImageUpload name="content"/>

              <button
                className="custom-button"
                type="submit"
                value="submit"
                onClick={this.handleSubmit}>
                <img src={require('../../assets/send.png')} alt="submit" width="40px"/>
                Post
              </button>

            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
}

export default MakePost