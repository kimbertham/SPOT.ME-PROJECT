import React from 'react'

const NewsFeedsCard = (posts, user) => (
  // * POST { content, user, likes, img }
  // * USERS { name, img }
  // ? we need in feeds-header the img of the user (user.img)
  // ? we need in feeds-header-title the user name (user.name)
  // ? we need in feeds-content the content of the post (post.content)
  // ? if the user upload a photo we need in feeds-image the photo (post.img)

  // ! we need at the button a function to increase the number of likes
  <div className="wrap-center">
    <div className="feeds-container">
      <div className="feeds-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Terry_Crews_by_Gage_Skidmore_5.jpg/440px-Terry_Crews_by_Gage_Skidmore_5.jpg" alt="test" />
        <h4 className="feeds-header-title">Terry Crews</h4> 
      </div>
      <div className="feeds-content">
        <h1>Lorem ipsum dolor</h1>
      </div>
      <div className="feeds-image">
        <figure>
          <img src="https://previews.123rf.com/images/nexusplexus/nexusplexus1309/nexusplexus130901873/22071838-imagen-de-libro-m%C3%A1gico-abierto-con-luces-m%C3%A1gicas.jpg" alt="test"/> 
        </figure>
      </div>
      <div className="feeds-likes">
        <img className="likes" src={require('../../assets/muscle.png')} alt="logo"/>
        <p><span>10 </span>likes</p>
      </div>
      <div className="feeds-buttons">
        <div className="field center-items">
          <div className="control center-items">
          <button className="feed-button">
            <input
            className="display-none"
            />
            <img src={require('../../assets/fitness.png')} alt="logo" width="20px"/>
            Like
          </button>
          <button className="feed-button">
            <input
            className="display-none"
            />
            <img src={require('../../assets/interface (1).png')} alt="logo" width="20px"/>
            Comment
          </button>
          </div>
        </div>
      </div>
      <div className="feeds-comments">
        <figure className="picture">
          <img 
            className="profile-picture" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Terry_Crews_by_Gage_Skidmore_5.jpg/440px-Terry_Crews_by_Gage_Skidmore_5.jpg"
            alt="logo" 
          />
        </figure>
        <div className="field">
          <textarea
            className="textarea"
            name="content"
            placeholder="Write a comment..."
          />
        </div>
      </div>
    </div>
  </div>
)


export default NewsFeedsCard