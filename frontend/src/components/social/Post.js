import React from 'react'


// * props: user
class Post extends React.Component {

  render() {
    console.log(this.props.user)
    return (
      <section className="section">
        <div className="post-container is-half">

          <div className="top-section">
            <figure className="picture">
              <img 
              className="profile-picture" 
              src={this.props.user.image} 
              alt="logo" 
              loading="lazy" 
              />
            </figure>
            <div className="field">
                <textarea
                  className="textarea"
                  name="description"
                  placeholder="Want to post something?"
                  // value={formData.description}
                  // onChange={this.handleChange}
                />
            </div>
          </div>

          <div className="bottom-section">

          </div>

        </div>
      </section>
    )
  }
}

export default Post