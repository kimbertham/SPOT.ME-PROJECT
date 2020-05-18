import React from 'react' 
import axios from 'axios'


class editProfile extends React.Component {
state = { 
  data: {
    description: '',
    firstName: '',
    lastName: ''
  }
}

async componentDidMount() {
  try {
    const userId = this.props.match.params.userId
    const data = await axios.get(`/api/profile/${userId}`)
    this.setState( { user: data.data })   
  } catch (err) {
    console.log(err)
  }
}

 handleSubmit = async event => {
   event.preventDefault()
   const userId = this.props.match.params.userId
   try {
    const data = { ...this.state.data }
    await axios.post(`/api/profile/${userId}/edit`, data)
    this.props.history.push(`/profile/${userId}`)
   } catch (err) {
    console.log(err)
   }
 }


handleChange = event => {
  const data = { ...this.state.data, [event.target.name]: event.target.value }
  this.setState({ data })
}

render() {
  console.log(this.state)
  console.log(this.props)
  return (
    <div className='edit-profile-container'>
    
      <div className='edit-form-container'> 
        <form onSubmit={this.handleSubmit} className="edit-profile-form">
          <div className="edit-field">
            <label className="label"> First Name </label>
            <input 
              className='edit-input'
              placeholder="First Name here"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.data.firstName}
            />
          </div>

          <div className="edit-field">
            <label className="label"> Last Name</label>
            <input 
              className='edit-input'
              placeholder="last Name"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.data.lastName}
            />
          </div>

          <div className="edit-field">
            <label className="label">Description </label>
            <textarea 
              className='edit-textarea'
              placeholder="description here"
              name="description"
              onChange={this.handleChange}
              value={this.state.data.description}
            />
          </div>

          {/* <div className="edit-field">
        <label className="label"> Level</label>
          <textarea 
            placeholder="level here"
            name="level"
            onChange={this.handleChange}
            value={this.state.data.level}
          />
        </div> */}
          <button>send!</button>
        </form>
      </div>


    </div>
  )
}
}
export default editProfile
