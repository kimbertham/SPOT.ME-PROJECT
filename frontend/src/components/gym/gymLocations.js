import React from 'react'
import axios from 'axios'
const ApiKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'

class gymLocations extends React.Component {
  state= {
    searchForm: {
      radius: '', // distance
      keyword: '', // keywords
      longitude: '', //location -- drop down with text of location but coordinates set as value of input option
      latitude: ''
    }
  }

  handleChange = event => {
    const searchForm = { ...this.state.form, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  handleSubmit = async event => {
    console.log('being submit')
    const { radius, location, keywords } = this.state
    event.preventDefault()
    try {
      const response = await axios.post('/api/locations', {keyword:'gym', radius: 5000, latitude: 51.5055, longitude: 0.0754
      })
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    console.log(this.state.searchForm)
    return (
      <>
        <section className='gymSearch'>
          <div className='gym-search-container'>

            <form onSubmit={this.handleSubmit} className='gym-search-form'>
      

              <div className='radius-field'>
                <label className='radius'><p>radius</p> </label>
                <input 
                  onChange={this.handleChange}
                  name='radius'
                  value={this.state.radius}
                  className='form-input' 
                  placeholder='radius'/>
              </div>

              <div className='keywords-field'>
                <label className='keywords'><p>keywords</p> </label>
                <input 
                  onChange={this.handleChange}
                  name='keywords' 
                  value={this.state.keywords}
                  className='form-input' 
                  placeholder='keywords'/>
              </div>

              <div className='location-field'>
                <label className='location'><p>location</p> </label>
                <input 
                  onChange={this.handleChange}
                  name='location' 
                  value={this.state.location}
                  className='form-input' 
                  placeholder='location'/>
              </div>

              <div className='search-button'>
                <button type='submit'>Search</button>
              </div>

            </form>

          </div>
        </section>

      </>
    )
  }
}

export default gymLocations