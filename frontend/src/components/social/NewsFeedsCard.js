import React from 'react'
import axios from 'axios'
import { withHeaders } from '../../lib/api'

class NewsFeedsCard extends React.Component {
  state = {
    // data: {
    //   content: ''
    // },
    showLikes: false
  }



    displayLikes = (value) =>{
      this.setState({showLikes: value})
    }


    render () {
      const { user, like, comment, change } = this.props
      const posts = user.posts ? user.posts : []
      const modalClassName = this.state.showLikes? 'display-block' : 'display-none'

      return (
        <>
          {posts.slice(0).reverse().map((post => {
            return <div key={post.id} className="wrap-center">
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
                    {post.image ? <img src={require(`${post.image}`)} alt="test"/> : null}
                  </figure>
                </div>

                <div className="feeds-likes" 
                  onMouseEnter={()=>{this.displayLikes(`${true}`)}}
                  onMouseLeave={()=>{this.displayLikes(`${''}`)}}>
                {/* display likes --------*/}
                <div className={`pop-up ${modalClassName}`}>
                {post.likes? post.likes.map(like=> {
                  return <p>{like.username} liked this!</p>
                }) : null} 
                </div>
                
                  <img 
                  className="likes" 
                  src={require('../../assets/muscle.png')} 
                  alt="logo"/>
                  <p><span> {post.likes.length} </span>likes</p>
                </div>

                <div className="feeds-buttons">
                  <div className="field center-items">
                    <div className="control center-items">

                      <button className="feed-button" onClick={()=>{
                        like(`${post._id}`)
                      }}> 
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
                
                {post.comments ? post.comments.map(comment =>{
                  return <div key={comment.id} className='post-comments-container'>
                    <div className='post-comment-field'>
                      <img src={`${comment.user.image}`} alt='commenters-img'></img>
                      <div className='commenters-comment'>
                        <p>{comment.user.username}</p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </div>
                }) : null }

                <div className="feeds-comments">
                  <figure className="picture">
                    <img 
                      className="profile-picture" 
                      src={`${user.image}`}
                      alt="logo" 
                    />
                  </figure>

                  <div className="field">
                    <form onSubmit={e=>{e.preventDefault(); comment(`${post.owner}` , `${post._id}`)
                    }}>
                      <textarea
                        className="textarea"
                        name="content"
                        placeholder="Write a comment..."
                        onChange={change}/>

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