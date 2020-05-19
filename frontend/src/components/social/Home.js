import React from 'react'

import NewsFeedsCard from './NewsFeedsCard'

class Home extends React.Component {
  state = { posts: [], 
    user: []
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="column">
            <NewsFeedsCard />
          </div>
        </div>
      </section>
    )
  }
}
export default Home