import React from 'react'
import axios from 'axios'
import Map from '../map/Map'
import GymSearch from './GymSearch'
// import { FlyToInterpolator } from 'react-map-gl'


class gymLocations extends React.Component {
  state= {
    searchForm: {
      keyword: '', 
      radius: '', 
      longitude: '', 
      latitude: '',
      address: ''
    },
    data: [],
    viewport: {
      latitude: 51.509865,
      longitude: -0.118092,
      width: '80vw',
      height: '80vh',
      zoom: 12
    }
  }

  handleChange = event => {
    const searchForm = { ...this.state.searchForm, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  async handleGeocoding() {
    const res = await axios.post('/api/locations/co' , { ...this.state.searchForm })
    const searchForm = { ...this.state.searchForm, latitude: res.data.lat, longitude: res.data.lng }
    const viewport= {...this.state.viewport, latitude: res.data.lat, longitude: res.data.lng }
    this.setState({ searchForm, viewport })

  }

//   handleFlyTo = () => {
//     this.map.flyTo({ center: [-118.4107187, 33.9415889] })
// }

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


  moveMap = (viewport) => {
      this.setState({ viewport })
  }

  render(){
    // console.log(this.state.data)
    return (
      <>
        <GymSearch
          change={this.handleChange} 
          submit={this.handleSubmit}
          {...this.state.searchForm}
          flyTo={this.handleFlyTo}
        />
        <div className="sidebar"></div>
        <Map 
          moveMap={this.moveMap}
          viewport={this.state.viewport}
          data={this.state.data}
        />
      </>
    )
  }
}

export default gymLocations