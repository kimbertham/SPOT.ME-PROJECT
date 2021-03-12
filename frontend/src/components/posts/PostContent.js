import React from 'react' 
import { defaultImage } from '../../lib/common'
import { deleteAPost } from '../../lib/api'

const PostContent = ({ current, user, p, getData }) => {

  return ( 
    <>
      <div className="feeds-header">
        <div className='center'>
          <img src={p.owner ? p.owner.image : defaultImage } alt="test" className='post-img' />
          <h3>{p.owner.username}</h3> 
        </div>
    
        <div onClick={()=> {
          deleteAPost(user.id, p._id) 
          getData(user.id)
        }} 
        className={current.id === p.owner.id ? 'display-block' : 'display-none'}>

          <img className='delete-post' src='https://bit.ly/3rKqOWF'/>
        </div>
      </div>

      <div className="feeds-content">
        <h1>{p.content}</h1>
      </div>
      <div className="feeds-image">
        <figure>
          {p.image ? <img src={p.image} alt="test"/> : null}
        </figure>
      </div>
    </>
  )
}

export default PostContent