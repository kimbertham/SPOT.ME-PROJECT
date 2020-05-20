import React from 'react'
import { getUserId } from '../../lib/auth'


class NewsFeedsCard extends React.Component {

    render () {
      const { post, user ,like,comment,change, commentDelete, deletePost, i, setIndex, indexState } = this.props
      const currentUser = getUserId()
      const profileUser =  user.id
      return (
        <>
            <div className="wrap-center">
              <div className="feeds-container">

                <div className="feeds-header">
                  <img src={`${user.image}`} alt="test" />
                  <h4 className="feeds-header-title">{user.username}</h4> 
                  <div 
                  className={currentUser === profileUser? 'display-block' : 'display-none'}
                  onClick={()=>{deletePost(`${post._id}`)}}><p> delete post req here</p></div>
                </div>
                <div className="feeds-content">
                  <h1>{post.content}</h1>
                </div>

                <div className="feeds-image">
                  <figure>
                    {post.image ? <img src={require(`${post.image}`)} alt="test"/> : null}
                  </figure>
                </div>
                <div 
                onMouseEnter={()=>{setIndex(`${i}`)}} className="feeds-likes"
                onMouseLeave={()=>{setIndex(null)}}>

                  <img 
                  className="likes" 
                  src={require('../../assets/muscle.png')} 
                  alt="logo"/>
                  
                  <div className={`likes-hover ${i.toString() === indexState? 'display-block' : 'display-none'}`}>  
                  {post.likes.map(like => {
                    return <p>{`${like.firstName}`}{`${like.lastName}`} liked this</p>
                  })}
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
                        <div 
                        className={currentUser === profileUser? 'display-block' : 'display-none'}
                        onClick={()=>commentDelete(`${post._id}`,`${comment._id}`)}><p>delete comment button</p></div>
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