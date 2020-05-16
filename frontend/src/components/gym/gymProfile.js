import React from 'react'
import { getToken, getPayload } from '../../lib/auth'

class gymProfile extends React.Component {

  getUser = () => { 
    try {
      const userId = getPayload()
      console.log(userId)
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    return (
    <section className="section">
      <div className="container">
      <figure className="profile-picture">
            <img className="profile-picture" src="https://www.tuenti.es/blog/wp-content/uploads/2018/09/App-videos-tecnologia.jpg" alt="logo" loading="lazy" />
      </figure>
      <div className="profile-data">
        <h3>Name: Matt Powers</h3>
        <h3>Description: Weights </h3>
      </div>
        <button>Follow</button>
      </div>
    </section>
    )
}
}

export default gymProfile