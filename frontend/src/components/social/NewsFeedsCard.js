import React from 'react'
import axios from 'axios'
import { withHeaders } from '../../lib/api'
import {getUserId} from '../../lib/auth'

class NewsFeedsCard extends React.Component {
  state= {
    comment: ''
  }

  postAComment = async (postOwner, postId) => {
    const res = await axios.put(`/profile/${postOwner}/post/${postId}/comment`,
    this.state.comment,
    withHeaders())
    const comment = res.data
    this.setState({comment})
  }


  render () {
    console.log(this.props)
    const { user, like } = this.props
    let posts = user.posts ? user.posts : []
    return (
      <>
      {posts.slice(0).reverse().map((post => {
    return <div className="wrap-center">
    <div className="feeds-container">
      <div className="feeds-header">
        <img src={`${user.image}`} alt="test" />
        <h4 className="feeds-header-title">{user.username}</h4> 
      </div>
      <div className="feeds-content">
        <h1>{post.content}</h1>
      </div>

      <div className="feeds-image">
        <figure>
          {post.image? <img src={require(`${post.image}`)} alt="test"/> : null}
        </figure>
      </div>

      <div className="feeds-likes">
        <img className="likes" src={require('../../assets/muscle.png')} alt="logo"/>
        <p><span> {post.likes.length} </span>likes</p>
      </div>

      <div className="feeds-buttons">
        <div className="field center-items">
          <div className="control center-items">


          <button className="feed-button" onClick={()=>{ like(`${post._id}`)}}> 
          {/*!call addLikefunction from parent */}
            <img src={require('../../assets/fitness.png')} alt="logo" width="20px"/>
            Like
          </button>
        
          <button className="feed-button"> 
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
            src={`${user.image}`}
            alt="logo" 
          />
        </figure>

        <div className="field">
          <form onSubmit={e=>{ e.preventDefault(); this.postAComment(`${post.owner}`,`${post._id}`)}}>
          <textarea
            className="textarea"
            name="content"
            placeholder="Write a comment..."/>
            <button> Send Comment </button>
            </form>
        </div>
      </div>
    </div>
  </div>
    }))}
  </>
    )
  }
}


export default NewsFeedsCard