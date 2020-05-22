import React from 'react'
import axios from 'axios'
import { withHeaders } from '../../lib/api'



class EditProfile extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId
      const user = await axios.get(`/api/profile/${userId}`)
      this.setState({ user: user.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const userId = this.props._id
      const data = { ...this.state.user }
      await axios.post(`/api/profile/${userId}/edit`, data, withHeaders())
      this.props.toggleModal()
    this.props.handleEdit()
    } catch (err) {
      console.log(err)
    }
  }



  handleChange = event => {
    const user = { ...this.state.user, [event.target.name]: event.target.value }
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    const modalClassName = this.props.modal ? 'display-block' : 'display-none'
    return (

      <>
        <div className={`${modalClassName} modal `}>
          <div className={`${modalClassName} modal-info modal-group`}>
            <div className="closed" onClick={this.props.toggleModal}> X</div>
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
      </>
    )
  }
}
export default EditProfile
