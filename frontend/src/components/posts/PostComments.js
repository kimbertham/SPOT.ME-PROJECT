import React from 'react' 
import { defaultImage } from '../../lib/common'
import { deleteAComment } from '../../lib/api'

const PostComments = ({ p, current }) => {

  return (
    <>              
      {p.comments ? p.comments.map(comment =>{
        return <div key={comment._id} className='post-comments-container'>
          <div className='post-comment-field'>
            <img src={comment.user.image ? `${comment.user.image}` : defaultImage } 
              alt='commenters-img'/>
            <div className='commenters-comment'>
              <p>{comment.user.username}</p>
              <p>{comment.content}</p>
              <div 
                className={current.id === p.owner.id  ? 'display-block' : 'display-none' ||
            current.id === p.comment.user.id ? 'display-block' : 'display-none' }
                onClick={()=>deleteAComment(`${p._id}`,`${p.owner._id}`,`${comment._id}`)}>
                <p className='delete-text'>delete</p></div>
            </div>
          </div>
        </div>
      }) : null }
    </>
  )
}
export default PostComments