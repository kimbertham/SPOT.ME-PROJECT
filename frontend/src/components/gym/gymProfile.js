import React from 'react'
import { getProfile } from '../../lib/api'

class gymProfile extends React.Component {
  state = { users: [
    {
      firstName: '',
      lastName: '',
      username: '',
      img: ''
    }
  ] }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId
      console.log(userId)
      const res = await getProfile(userId)
      console.log(res)
      this.setState( { users: res.data } )  
      console.log(userId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    
    const { users } = this.state
    return (
      <section className="section">
        <div className="container">
          <figure className="picture">
            <img className="profile-picture" alt="logo" loading="lazy" />
          </figure>
          <div className="profile-data">
            <h3>{users.firstName}</h3>
            <h3>Description: Weights {users.username} </h3>
          </div>
          <button>Follow</button>
        </div>
      </section>
    )
  }
}



export default gymProfile