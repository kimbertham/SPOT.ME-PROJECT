import React from 'react' 
import axios from 'axios'

import { withRouter } from 'react-router-dom'
import { getUserId } from '../../lib/auth'
import { withHeaders } from '../../lib/api' 

import EditProfile from './EditProfile'
import ProfileInfo from './ProfileInfo'
import FriendsSidebar from '../common/FriendsSidebar'
import Followers from './Followers'
import ProfileSidebar from '../common/ProfileSidebar'

import MakePost from '../posts/MakePost'
import Posts from '../posts/Posts'

const id = getUserId()

class Profile extends React.Component {
state = {
  user: null, 
  current: false,
  modal: false
}

userId = this.props.match.params.userId

async componentDidMount() {
  this.getCurrent()
  this.getData(this.userId)
}

setModal = (section) => {
  console.log('calling')
  this.setState({ modal: section ? section : false })
}

followUser = async (id) =>{
  await axios.put(`/api/profile/${id}/follow`, '' , withHeaders())
  this.getCurrent()
}

getCurrent = async () => {
  const res = await axios.get(`/api/profile/${id}`)
  this.setState({ current: res.data })
}

getData = async (id) => {
  const res = await axios.get(`/api/profile/${id}`)
  this.setState({ user: res.data })
}

render(){
  const { user, modal, current } = this.state
  if (!user) return null

  return (
    <div className='p-page-cont'>

      <ProfileSidebar 
        modal={this.state.modal}
        user={this.state.user.id}/>
        
      {modal === 'followers' ? 
        <Followers 
          user={user} 
          setModal={this.setModal} 
          getData={this.getData}/> 
        :
        modal === 'edit' ?  
          <EditProfile 
            user={user}
            setModal={this.setModal}
            getData={this.getData}/>
          
          : null}

      <div className='main'>
        <ProfileInfo  
          user={user}
          current={current}
          followUser={this.followUser}
          setModal={this.setModal}/>

        <MakePost 
          user={user}
          current={current}
          refresh={this.getData}/>

        <Posts 
          getData={this.getData}
          current={current}
          user={current}
          posts={user.posts}/>
      </div>

      <FriendsSidebar/> 

    </div>
  )
}
}
export default withRouter(Profile)