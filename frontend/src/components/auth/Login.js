import React from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../lib/notifications'
import { setToken } from '../../lib/auth'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = event => {
    try {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData, error: '' })
    } catch (err) {
      console.log(err)
    }
    
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/login', { ...this.state.formData })
      console.log(res.data.token)
      setToken(res.data.token)
      // this.props.history.push('/should be the newsfeed') //* route does not exist yet
      notify(res.data.message)
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {
    const { formData, error } = this.state
    return (
      <section className="section">
        <ToastContainer/>
        <div className="container">
          <div className="columns">
            <form 
              onSubmit={this.handleSubmit} 
              className="column is-half is-offset-one-quarter box"
            >
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : '' }`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Login</button>
              </div>
              <div className="field">
                <p className="textAlign">New to Spot.me?<Link to="/register" > Register here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Login