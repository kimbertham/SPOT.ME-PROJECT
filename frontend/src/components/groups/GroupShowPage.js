import React from 'react'
import GroupSidebar from './GroupSidebar'
import GroupInfo from './GroupInfo'
import GroupPost from './GroupPost'
import GroupNewsFeedsCard from './GroupNewsFeedsCard'
import { getGroup, getProfile } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import axios from 'axios'
import FriendsSidebar from '../common/FriendsSidebar'

class GroupShow extends React.Component {
  state = {
    group: {},
    modal: false,
    user: {},
    formData: {
      content: ''
    },
    commentData: {
      content: ''
    }
  }


  async componentDidMount() {
    try {
      const groupId = this.props.match.params.groupId
      const res = await getGroup(groupId)
      const userId = await getUserId()
      const resUser = await getProfile(userId)
      // console.log(res.data);
      // console.log(resUser.data);
      this.setState({ group: res.data, user: resUser.data })
    } catch (err) {
      console.log(err)
    }
  }

  joinGroup = async () => {
    const userId = await getUserId()
    const groupId = this.state.group._id
    await axios.put(`/api/groups/${groupId}/join/${userId}`, '',
      { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
    )
    const res = await getGroup(groupId)
    this.setState({ group: res.data })
  }

  leaveGroup = async () => {
    const userId = await getUserId()
    const groupId = this.state.group._id
    await axios.put(`/api/groups/${groupId}/leave/${userId}`, '',
      { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
    )
    const res = await getGroup(groupId)
    this.setState({ group: res.data })
  }


  handleChange = event => {
    const value = event.target.value
    this.setState({
      formData: {
        content: value
      }
    })
  }

  postToGroup = async (e) => {
    e.preventDefault()
    console.log('posting');
    try {
      const userId = await getUserId()
      await axios.post(`/api/groups/${this.state.group._id}/post/${userId}`, this.state.formData,
        { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
      )
      const res = await getGroup(this.state.group._id)
      this.setState({
        group: res.data,
        formData: {
          content: ''
        }
      })
    } catch (err) {
      console.log(err);
    }
  }



  addLike = async (postId) => {
    console.log(postId);

    try {
      const userId = getUserId()
      await axios.put(`/api/groups/${this.state.group._id}/post/${postId}/like`,'' ,  { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } } )
      const res = await getGroup(this.state.group._id)
      this.setState({
        group: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleCommentChange = event => {
    console.log(event.target.value);
    
    const value = event.target.value
    this.setState({
      commentData: {
        content: value
      }
    })
  }

  postComment = async (postId) => {
   
    console.log(postId);
    try {
      await axios.put(`/api/groups/${this.state.group._id}/post/${postId}/comment`, this.state.commentData,
        { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
      )
      const res = await getGroup(this.state.group._id)
      this.setState({
        group: res.data,
        commentData: {
          content: ''
        }
      })
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    // console.log(this.state)
    return (
      <div className='profile-page-container'>
        <GroupSidebar
          modal={this.state.modal}
          setModal={this.setModal}
          hideModal={this.hideModal}
          members={this.state.group.members} />

        <div className='mid-section'>

          <div className='profile-info-component'>
            <GroupInfo
              group={this.state.group} user={this.state.user} members={this.state.group.members} join={this.joinGroup} leave={this.leaveGroup} />
          </div>

          <div className='profile-post'>
            <GroupPost
              {...this.state} handleSubmit={this.postToGroup} handleChange={this.handleChange}
            />

            <GroupNewsFeedsCard
              user={this.state.user}
              like={this.addLike}
              group={this.state.group}
              handleChange={this.handleCommentChange}
              commentData={this.state.commentData.content}
              postComment = {this.postComment}
            /> 

          </div>

        </div>
        <FriendsSidebar />

      </div>
    )
  }
}

export default GroupShow