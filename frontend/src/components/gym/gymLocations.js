import React from 'react'
import axios from 'axios'
const ApiKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'

class gymSearch extends React.Component {
  state= {
    searchForm: {
      radius: '', // distance
      keywords: '', // keywords
      location: '' //location -- drop down with text of location but coordinates set as value of input option
    }
  }

  handleChange = event => {
    const searchForm = { ...this.state.form, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  handleSubmit = async event => {
    const { radius, location, keywords } = this.state
    event.preventDefault()
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?
      key=${ApiKey}&
      radius=${radius}}&
      location=${location}}&
      language=en&
      keyword=${keywords}&
      fields=formatted_address,name`
      )
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return (
    <>
    <section className='gymSearch'>
      <div className='gym-search-container'>

        <form className='gym-search-form'>
      

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

        </form>

      </div>
    </section>

    </>
    )
  }
}

export default gymSearch