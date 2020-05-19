import React from 'react'
import GroupSidebar from './GroupSidebar'
import GroupInfo from './GroupInfo'
import GroupPost from './GroupPost'
import GroupNewsFeedsCard from './GroupNewsFeedsCard'
import { getGroup, getProfile } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import axios from 'axios'

class GroupShow extends React.Component {
  state = {
    group: {},
    modal: false,
    user: {}
  }


  async componentDidMount() {
    try {
      const groupId = this.props.match.params.groupId
      const res = await getGroup(groupId)
      const userId = await getUserId()
      const resUser = await getProfile(userId)
      // console.log(res.data);
      // console.log(resUser.data);
      this.setState( { group: res.data, user: resUser.data })   
    } catch (err) {
      console.log(err)
    }
  }

  joinGroup = async () =>{
    const userId = await getUserId()
    const groupId = this.state.group._id
  await axios.put(`/api/groups/${groupId}/join/${userId}`, '' ,
  { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`} }
)
const res = await getGroup(groupId)
this.setState( { group: res.data })  
}

leaveGroup = async () =>{
  const userId = await getUserId()
  const groupId = this.state.group._id
await axios.put(`/api/groups/${groupId}/leave/${userId}`, '' ,
{ headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`} }
)
const res = await getGroup(groupId)
this.setState( { group: res.data })  
}

  // addLike = async (postId) => {
  //   try {
  //     const userId = getUserId()
  //     const res = await axios.put(`/api/profile/${userId}/post/${postId}`,'' ,  withHeaders() )
  //     this.setState({ user: res.data })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


//   <GroupNewsFeedsCard
//   user={this.state.user}
//   like={this.addLike}
// />

  render() {
    // console.log(this.state)
    return (
      <div className='profile-page-container'>
        <GroupSidebar
          modal={this.state.modal}
          setModal={this.setModal}
          hideModal={this.hideModal}
          members={this.state.group.members} />

        <div className='right-section'>

          <div className='profile-info-component'>
            <GroupInfo
              group={this.state.group} user={this.state.user} members={this.state.group.members} join={this.joinGroup} leave={this.leaveGroup} />
          </div>

          <div className='profile-post'>
            <GroupPost
              {...this.state}
              
            />

           


          </div>

        </div>


      </div>
    )
  }
}

export default GroupShow