import React from 'react'
import GroupSidebar from './GroupSidebar'
import GroupInfo from './GroupInfo'
import GroupPost from './GroupPost'
import GroupNewsFeedsCard from './GroupNewsFeedsCard'
import { getGroup } from '../../lib/api'

class GroupShow extends React.Component {
  state = {
    group: {},
    modal: false
  }


  async componentDidMount() {
    try {
      const groupId = this.props.match.params.groupId
      const res = await getGroup(groupId)
      console.log(res.data);
      
      this.setState( { group: res.data })   
    } catch (err) {
      console.log(err)
    }
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
              group={this.state.group} />
          </div>

          <div className='profile-post'>
            <GroupPost
              group={this.state.group}
            />

            <GroupNewsFeedsCard
              user={this.state.user}
              like={this.addLike}
            />


          </div>

        </div>


      </div>
    )
  }
}

export default GroupShow