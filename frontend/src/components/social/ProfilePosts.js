import React from 'react'
import axios from 'axios'
import { withHeaders } from '../../lib/auth'

class ProfilePosts extends React.Component {
state={}

addLike = async (postId) => {
  try {
    const userId = this.props.user
    await axios.put(`/api/profile/${userId}/post/${postId}`,'' ,
    // * this was already a function - tom
      { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`} })
  } catch (err) {
    console.log(err)
  }
}


render() {
  const {posts, username } = this.props
  let post = posts? posts : []

  return (
    <>
      {post.slice(0).reverse().map((post,i) => {
        return  <div key={post._id} className='profile-posts-container'>
          <div className='profile-post-field'>
            <div className='profile-post-header'>
              <img className='profile-post-img' src={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} alt='poster-img'/>
              <h1>{username}</h1>
            </div>
            <div className='profile-post-content'>
              <p> {`${post.content}`} </p>
            </div>
            <div className='profile-post-likes'>
              <p><small>{`${post.likes >= 0 ? '' : `${post.likes} and others like this`}`} </small></p>
            </div>
            <div className='profile-react-buttons'>
              <button onClick={()=>{this.addLike(`${post._id}`)}}>Like</button>
              <button>comments</button>
            </div>
    
            <div className='profile-post-comments'>
    
              <div className='profile-comment-field'>
                <img className='user-img-small' src={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} alt='commenter-img'/>
                <p> comments will go here </p>
              </div> 
            </div>
    
    
            <div className='profile-make-comment'>
              <img className='user-img-small' src={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} alt='current-user-img' />
    
              <input className='make-profile-comments'/>
            </div>
          </div>
        </div> 
    
      })}
    </>

  )
}
}

export default ProfilePosts