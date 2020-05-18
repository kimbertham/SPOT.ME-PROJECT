import React from 'react' 
import Post from './Post'
import { getProfile } from '../../lib/api'
import ProfileInfo from '../social/ProfileInfo'

class Profile extends React.Component {
state = {
  user : {}
}

async componentDidMount() {
  try {
    const userId = this.props.match.params.userId
    const res = await getProfile(userId)
    this.setState( { user: res.data } )  
  } catch (err) {
    console.log(err)
  }
}

  render(){
    console.log(this.state)
    return (
      <div>

      <ProfileInfo 
      user={this.state.user}/>

        <Post 
        user={this.state.user}
        />

      </div>
    )
  }
}

export default Profile