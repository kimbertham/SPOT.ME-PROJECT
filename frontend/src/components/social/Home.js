import React from 'react'
import axios from 'axios'
import { getProfile } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import ProfileSidebar from '../common/ProfileSidebar'
import NewsFeedsCard from './NewsFeedsCard'
import FriendsSidebar from '../common/FriendsSidebar'
import Post from './Post'

class Home extends React.Component {
  state = { posts: [], 
    user: []
  }

  getData = async () => {
    const res = await getProfile(getUserId())
    console.log(res)
    this.setState( { user: res.data }) 
  }
  
  async componentDidMount() {
    try {
      this.getData() 
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className='profile-page-container'>
        
      <ProfileSidebar 
        modal={this.state.modal}
        setModal={this.setModal}
        hideModal={this.hideModal}
        user={this.state.user.id}/>

      <div className='mid-section'>

        <div className='profile-post'>
          <Post 
            user={this.state.user}
            refresh={this.getData}
          />

          <NewsFeedsCard
            user={this.state.user}
            like={this.addLike}
            comment={this.postAComment}
            change={this.handleChange}
          />


        </div>
      </div>
      <FriendsSidebar/>
    </div>
    )
  }
}
export default Home