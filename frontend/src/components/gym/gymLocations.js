import React from 'react'
import axios from 'axios'
const ApiKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'

class gymLocations extends React.Component {
  state= {
    searchForm: {
      keyword: '', 
      radius: '', 
      longitude: '', 
      latitude: ''
    }
  }

  handleChange = event => {
    const searchForm = { ...this.state.searchForm, [event.target.name]: event.target.value }
    this.setState({ searchForm})
  }

  handleSubmit = async event => {
    console.log('being submit')
    const { radius, location, keywords } = this.state
    event.preventDefault()
    try {
      const response = await axios.post('/api/locations', {...this.state.searchForm})
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
      
                <div className='keywords-field'>
                  <label className='keywords'><p>keywords</p> </label>
                  <input 
                    onChange={this.handleChange}
                    name='keywords' 
                    value={this.state.keywords}
                    className='form-input' 
                    placeholder='keywords'/>

              <div className='radius-field'>
                <label className='radius'><p>radius</p> </label>
                <input 
                  onChange={this.handleChange}
                  name='radius'
                  value={this.state.radius}
                  className='form-input' 
                  placeholder='radius'/>
              </div>

              </div>

              <div className='longitude-field'>
                <label className='longitude'><p>longitude</p> </label>
                <input 
                  onChange={this.handleChange}
                  name='longitude' 
                  value={this.state.longitude}
                  className='form-input' 
                  placeholder='longitude'/>
              </div>

              <div className='latitude-field'>
                <label className='latitude'><p>latitude</p> </label>
                <input 
                  onChange={this.handleChange}
                  name='latitude'
                  value={this.state.latitude}
                  className='form-input' 
                  placeholder='latitude'/>
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