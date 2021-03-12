import React from 'react'

const PostLikes = ({ p }) => {
  return (
    <div className="feeds-likes"
    // onMouseEnter={()=>{
    //   setIndex(`${i}`)
    // }} 
    // onMouseLeave={()=>{
    //   setIndex(null)
    // }}
    >
      <img 
        className="likes" 
        src={require('../../assets/muscle.png')} 
        alt="logo"/>
        
      <div 
      // className={`likes-hover ${i.toString() === indexState ? 'display-block' : 'display-none'}`}
      >  
        {p.likes ? p.likes.map((like,i) => {
          return <p key={i}>{`${like.firstName}`}{`${like.lastName}`} liked this</p>
        }) : null}
      </div>
      <p><span>{p.likes.length > 0 ? p.likes.length : 0 }</span> likes</p>
    </div>
  )
}
export default PostLikes