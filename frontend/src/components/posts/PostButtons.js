import React from 'react' 
import { toggleLike } from '../../lib/api'

const PostButtons = ( { p }) => {

  return (
    <div className="feeds-buttons">
      <div className="field center-items">
        <div className="control center-items">
        
          <button className="feed-button" onClick={()=>{
            toggleLike(p.owner.id, p._id)
          }}> 
            <img 
              src={require('../../assets/fitness.png')} alt="logo" width="20px"/>
              Like
          </button>

          <button className="feed-button"> 
            <img src={require('../../assets/interface (1).png')} alt="logo" width="20px"/>
            Comment
          </button>

        </div>
      </div>
    </div>
  )
}
export default PostButtons