import React from 'react'


class NewsFeedsCard extends React.Component {
  state = {
    showLikes: false,
  }


    render () {
      // const { user, like, comment, change } = this.props
      // const posts = user.posts ? user.posts : []
      // const modalClassName = this.state.showLikes? 'display-block' : 'display-none'
      const { post,user,like,comment,change, commentDelete, deletePost, showLikes } = this.props
      console.log(post.likes)
      return (
        <>
            <div className="wrap-center">
              <div className="feeds-container">

                <div className="feeds-header">
                  <img src={`${user.image}`} alt="test" />
                  <h4 className="feeds-header-title">{user.username}</h4> 
                  <div onClick={()=>{deletePost(`${post._id}`)}}><p> delete post req here</p></div>
                </div>
                <div className="feeds-content">
                  <h1>{post.content}</h1>
                </div>

                <div className="feeds-image">
                  <figure>
                    {post.image ? <img src={require(`${post.image}`)} alt="test"/> : null}
                  </figure>
                </div>
                <div  onClick={showLikes} className="feeds-likes">
                  <img 
                  className="likes" 
                  src={require('../../assets/muscle.png')} 
                  alt="logo"/>
                  <div className="show-likes-div">  
                  </div>
                  <p><span>{post.likes.length}</span>likes</p>
                </div>

                <div className="feeds-buttons">
                  <div className="field center-items">
                    <div className="control center-items">
                      <button className="feed-button" onClick={()=>{like(`${post._id}`)}}> 
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
                  return <div key={comment._id} className='post-comments-container'>
                    <div className='post-comment-field'>
                      <img src={`${comment.user.image}`} alt='commenters-img'></img>
                      <div className='commenters-comment'>
                        <p>{comment.user.username}</p>
                        <p>{comment.content}</p>
                        <div onClick={()=>commentDelete(`${post._id}`,`${comment._id}`)}><p>delete comment button</p></div>
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
                    <form onSubmit={e=>{ e.preventDefault(); comment(`${post.owner}` , `${post._id}`)}}>
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
        </>
      )
    }
}


export default NewsFeedsCard