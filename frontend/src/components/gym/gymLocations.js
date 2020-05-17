import React from 'react'
import axios from 'axios'
import Map from '../map/Map'
import GymSearch from './GymSearch'


class gymLocations extends React.Component {
  state = {
    searchForm: {
      keywords: '', 
      radius: '', 
      longitude: '', 
      latitude: ''
    },
    data: []
  }

  handleChange = event => {
    const searchForm = { ...this.state.searchForm, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/locations', { ...this.state.searchForm }) 
      console.log(response.data)
      this.setState({ data: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return (
      <>
      <GymSearch
        change={this.handleChange} 
        submit={this.handleSubmit}
        {...this.state.searchForm}
      />

      <Map 
        {...this.state}
      />
      </>
    )
  }
}

export default gymLocations