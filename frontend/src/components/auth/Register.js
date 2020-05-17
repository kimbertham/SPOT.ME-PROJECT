import React from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../lib/notifications'
// import ImageUpload from '../common/ImageUpload'

class Register extends React.Component {
  state = {
    formData: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      level: ''
    },
    errors: []
  }

  handleChange = event => {
    try {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
      const formData = { ...this.state.formData, [event.target.name]: value }
      const errors = { ...this.state.errors, [event.target.name]: '' }
      this.setState({ formData, errors })
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  //* converts an array into object and sets state for errors
  getSubmitErrors = (arr) => {
    function reducer(a, errItem) {
      return { ...a, [errItem[0]]: errItem[1].message.replace('Path ', '') }
    }
    const error = arr.reduce(reducer, {})
    this.setState({ errors: error })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      // console.log(this.state.formData)
      const res = await axios.post('/api/register', { ...this.state.formData })
      this.props.history.push('/login') //* Should go straight to search fields or interests
      notify(res.data.message)
    } catch (err) {
      console.log(err.response.data)
      this.getSubmitErrors(err.response.data)
    }
  }

  render() {
    const { formData, errors } = this.state
    console.log(this.state)
    // console.log(this.getSubmitErrors(['email', 'usernames']) )
    return ( 
      <section className="section">
        <div className="container">
          <ToastContainer/>
          <div className="columns">
            <form onSubmit={ this.handleSubmit } className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input 
                    className={ `input ${errors.username ? 'is-danger' : '' }` }
                    placeholder="First Name"
                    name="firstName"
                    onChange={ this.handleChange }
                    value={ formData.firstName }
                  />
                </div>
                { errors.firstName && <small className="help is-danger">{errors.firstName}</small> }
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input 
                    className={ `input ${errors.password ? 'is-danger' : '' }` }
                    placeholder="Last Name"
                    name="lastName"
                    onChange={ this.handleChange }
                    value={ formData.lastName }
                  />
                </div>
                { errors.lastName && <small className="help is-danger">{errors.lastName}</small> }
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input 
                    className={ `input ${errors.username ? 'is-danger' : '' }` }
                    placeholder="Username"
                    name="username"
                    onChange={ this.handleChange }
                    value={ formData.username }
                  />
                </div>
                { errors.username && <small className="help is-danger">{errors.username}</small> }
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    className={ `input ${errors.email ? 'is-danger' : ''}` }
                    placeholder="Email"
                    name="email"
                    onChange={ this.handleChange }
                    value={ formData.email }
                  />
                </div>
                { errors.email && <small className="help is-danger">
                  {formData.email ? 'An account with this email already exists' : errors.email }
                </small> }
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                    className={ `input ${errors.password ? 'is-danger' : ''}` }
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleChange }
                    value={ formData.password }
                  />
                </div>
                { errors.password && <small className="help is-danger">{errors.password}</small> }
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input 
                    type="password"
                    className={ `input ${errors.passwordConfirmation ? 'is-danger' : ''}` }
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={ this.handleChange }
                    value={ formData.passwordConfirmation }
                  />
                </div>
                { errors.passwordConfirmation && <small className="help is-danger">Your entered passwords do not match</small> }
              </div>
              <div className="field">
                <label className="label">What`s your skill level? (Optional)</label>
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="level"
                      value="beginner"
                      onChange={ this.handleChange }
                      checked={ formData.level === 'beginner' }
                    />
                    Beginner
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="level"
                      value="intermediate"
                      onChange={ this.handleChange }
                      checked={ formData.level === 'intermediate' }
                    />
                    Intermediate
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="level"
                      value="advanced"
                      onChange={ this.handleChange }
                      checked={ formData.level === 'advanced' }
                    />
                    Advanced
                  </label>
                </div>
              </div>
              {/* //* can't get upload to work */}
              {/* <div className="field">
                <div className="control">
                  <ImageUpload 
                    onChange={ this.handleChange }
                    name="image"
                  />
                </div>
              </div> */}
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register