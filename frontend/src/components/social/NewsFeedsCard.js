import React from 'react'

const NewsFeedsCard = (posts, user) => (
  // * POST { content, user, likes, img (not nbefe) }
  // * USERS { name, img }


  <div className="container">
    <div className="feeds-container">
      <div className="feeds-header">
        <img src={user.img} alt="test" /> 
        <h4 className="feeds-header-title">{user.posts}</h4>
      </div>
      <div className="feeds-content">
        <h2>{posts.content}</h2>
      </div>
      <div>
        <figure>
          <img src="test.jpg" alt="test"/>
        </figure>
      </div>
    </div>
  </div>
)


export default NewsFeedsCard