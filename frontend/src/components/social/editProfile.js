import React from 'react' 
import axios from 'axios'


class editProfile extends React.Component {
state = { 
  data: {
  description: '',
  }
}

 handleSubmit = async event => {
  event.preventDefault()
  const userId = this.props.match.params.userId
  try {
  const data = {...this.state.data}
  await axios.post(`/api/profile/${userId}/edit`, data)
  this.props.history.push(`/profile/${userId}`)
} catch (err) {
  console.log(err)
}
}


handleChange = event => {
  const data = { ...this.state.formData, [event.target.name]: event.target.value }
  this.setState({ data })
}

render() {
  console.log(this.state)
  console.log(this.props)
  return (
    <>
    <form onSubmit={this.handleSubmit} className="edit-profile-form">
      <div className="edit-field">
        <label className="label"> Description</label>
          <textarea 
            placeholder="description here"
            name="description"
            onChange={this.handleChange}
            value={this.state.data.description}
          />
        </div>
        <button>send!</button>
        </form>
      </>
  )
}
}
export default editProfile
