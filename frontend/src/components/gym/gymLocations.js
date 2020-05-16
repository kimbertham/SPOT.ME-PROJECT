import React from 'react'
import axios from 'axios'
import Map from '../map/Map'
import GymSearch from './GymSearch'


class gymLocations extends React.Component {
  state= {
    searchForm: {
      keyword: '', 
      radius: '', 
      longitude: '', 
      latitude: '',
      address: ''
    },
    data: []
  }

  handleChange = event => {
    const searchForm = { ...this.state.searchForm, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  async handleGeocoding() {
    const res = await axios.post('/api/locations/co' , { ...this.state.searchForm })
    const searchForm = { ...this.state.searchForm, latitude: res.data.lat, longitude: res.data.lng }
    this.setState({ searchForm })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await this.handleGeocoding()
      const response = await axios.post('/api/locations', { ...this.state.searchForm }) 
      this.setState({ data: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    // console.log(this.state.data)
    return (
      <>
        <GymSearch
          change={this.handleChange} 
          submit={this.handleSubmit}
          {...this.state.searchForm}
        />

        <Map 
          longitude={this.state.searchForm.longitude}
          latitude={this.state.searchForm.latitude}
          data={this.state.data}
        />

      </>
    )
  }
}

export default gymLocations