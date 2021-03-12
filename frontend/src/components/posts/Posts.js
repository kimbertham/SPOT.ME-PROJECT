import React from 'react'
import PostHeader from './PostContent'
import PostLikes from './PostLikes'
import PostButtons from './PostButtons'
import MakeComment from './MakeComment'
import PostComments from './PostComments'

const Posts = ( { posts, current, user, getData }) => {

  if (!posts) return null 

  return (
    <>
      {posts.map(p => {
        return (
          
          <div className="wrap-center" key={p._id}>
            <div className="feeds-container">
  
              <PostHeader 
                p={p} 
                user={user}
                current={current} 
                getData={getData}/>
  
              <PostLikes
                p={p}/>
  
              <PostButtons 
                p={p}/>
  
              <PostComments 
                curernt={current} 
                p={p} />
  
              <MakeComment 
                p={p}
                current={current}/>
  
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Posts