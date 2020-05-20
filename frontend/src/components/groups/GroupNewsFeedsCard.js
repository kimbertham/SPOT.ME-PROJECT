import React from 'react'

class NewsFeedsCard extends React.Component {
  state = {
    data : {
      content: ''
    }
  
  }


  // postAComment = async (postOwner, postId) => {
  //   const userId= getUserId()
  //   const res = await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`, this.state.data , withHeaders() )
  //   const content = res.data
  //   this.setState({content})
  // }

  // handleChange = event => {
  //   const data = { ...this.state.data, [event.target.name]: event.target.value }
  //   this.setState( {data} )
  // }

  render () {

    const { user, like, group } = this.props
    let GroupPosts = group.posts ? group.posts : []

    return (
      <>

      {GroupPosts.slice(0).reverse().map((post => {
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

      {post.comments? post.comments.map(comment =>{
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
          <form onSubmit={e=>{ e.preventDefault(); this.props.postComment(post._id)}}>
          <textarea
            className="textarea"
            name="content"
            placeholder="Write a comment..."
            onChange={this.props.handleChange}
            value={this.props.commentData}
            />
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