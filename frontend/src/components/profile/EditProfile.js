import React from 'react'
import axios from 'axios'
import { withHeaders } from '../../lib/api'

class EditProfile extends React.Component {
  state = {
    user: {}
  }

  componentDidMount () {
    this.setState({ user: this.props.user })
  }

  handleChange = event => {
    console.log(event.target.value)
    const user = { ...this.state.user, [event.target.name]: event.target.value }
    this.setState({ user })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { getData, user, setModal } = this.props
    await axios.post(`/api/profile/${user.id}/edit`, { ...this.state.user }, withHeaders())
    getData(user.id)
    setModal()
  }

  render() {
    const { setModal } = this.props
    const { user } = this.state

    return (
      <div className='modal-' onClick={setModal}>
        <div className='modal-info modal-group' onClick={ e => e.stopPropagation()}>

          <h1> Edit Details </h1>
          <form onSubmit={this.handleSubmit} className="group-profile-form">
            <div className="field">
              <label className="label"> First Name </label>
              <div className="control">
                <input
                  className=' input is-info group-input'
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleChange}
                  value={user.firstName}
                />
              </div>
            </div>
            <div className="field">
              <label className="label"> Last Name </label>
              <div className="control">
                <input
                  className=' input is-info group-input'
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleChange}
                  value={user.lastName}
                />
              </div>
            </div>

            <div className="field">
              <label className="label"> Email </label>
              <div className="control">
                <input
                  className='input is-info group-input'
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  value={user.email}
                />
              </div>
            </div>
          
            <button type="submit" className="button is-fullwidth is-rounded is-link">Send!</button>
          </form>
        </div>
      </div>
    )
  }
}
export default EditProfile
