import React from 'react' 
import { defaultImage } from '../../lib/common'
import { postAComment } from '../../lib/api'

class MakeComment extends React.Component {
  state = {
    data: {
  
    }
  }

  handlechange(event) {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState({ data })
  }

  render() {

    const { current, p } = this.props
    const { data } = this.state

    return (
      <div className="feeds-comments">

        <figure className="picture">
          <img 
            className="profile-picture" 
            src={current.image ? current.image : defaultImage}
            alt="logo" />
        </figure>

        <div className="field">
          <form onSubmit={e =>{
            e.preventDefault(); postAComment(`${p.owner._id}` , `${p._id}`)
          }}>
            <textarea
              className="textarea"
              name="content"
              placeholder="Write a comment..."
              onChange={this.handlechange}
              value={data.value}/>
            <button> Send Comment </button> 
          </form>
        </div>

      </div>
    )
  }
}
export default MakeComment