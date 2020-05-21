import React from 'react' 
import axios from 'axios'



class editProfile extends React.Component {
state = { 
  user: {}
}

async componentDidMount() {
  try {
    const userId = this.props.match.params.userId
    const user = await axios.get(`/api/profile/${userId}`)
    this.setState( { user: user.data })   
  } catch (err) {
    console.log(err)
  }
}

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const userId = this.props.match.params.userId
      const data = { ...this.state.user }
      await axios.post(`/api/profile/${userId}/edit`, data)
      this.props.history.push(`/profile/${userId}`)
    } catch (err) {
      console.log(err)
    }
  }

returnPage = () => {
  const userId = this.props.match.params.userId
  this.props.history.push(`/profile/${userId}`)
}


handleChange = event => {
  const user = { ...this.state.user, [event.target.name]: event.target.value }
  this.setState({ user })
}

render() {
  console.log(this.state)
  console.log(this.props)
  return (
    <div className='edit-profile-container'>
      <div className='edit-form-container'> 
        <div onClick={this.returnPage} className='back-cross'><p> X </p></div>
        <form onSubmit={this.handleSubmit} className="edit-profile-form">
          <div className="edit-field">
            <label className="label"> First Name </label>
            <input 
              className='edit-input'
              placeholder="First Name here"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.user.firstName}
            />
          </div>

          <div className="edit-field">
            <label className="label"> Last Name</label>
            <input 
              className='edit-input'
              placeholder="last Name"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.user.lastName}
            />
          </div>

          <div className="edit-field">
            <label className="label">Description </label>
            <textarea 
              className='edit-textarea'
              placeholder="description here"
              name="description"
              onChange={this.handleChange}
              value={this.state.user.description}
            />
          </div>
          <button>send!</button>
        </form>
      </div>


    </div>
  )
}
}
export default editProfile
