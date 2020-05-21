import React from 'react'
import axios from 'axios'
import Map from '../map/Map'
import GymSearch from './GymSearch'
import ProfileSidebar from '../common/ProfileSidebar'
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
      width: '84.5vw',
      height: '82.5vh',
      zoom: 12
    }, 
    user: {},
    modal: false
  }

  handleChange = event => {
    const searchForm = { ...this.state.searchForm, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  async handleGeocoding() {
    const res = await axios.post('/api/locations/co' , { ...this.state.searchForm })
    const searchForm = { ...this.state.searchForm, latitude: res.data.lat, longitude: res.data.lng }
    const viewport = { ...this.state.viewport, latitude: res.data.lat, longitude: res.data.lng }
    this.setState({ searchForm, viewport })
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

  moveMap = (viewport) => {
    this.setState({ viewport })
  }

  setModal =() => {
    this.setState({ modal: true })
  }
  hideModal = () => {
    this.setState({ modal: false })
  }

  render(){
    return (
      <>
        <div className="locations">
          <div className="search">
            <GymSearch
              change={this.handleChange} 
              submit={this.handleSubmit}
              {...this.state.searchForm}
              flyTo={this.handleFlyTo}
            />
          </div>
          <div className="map">
            <Map
              moveMap={this.moveMap}
              viewport={this.state.viewport}
              data={this.state.data}
            />
          </div>
        </div>
        <div className="sidebar">
          <ProfileSidebar 
            modal={this.state.modal}
            setModal={this.setModal}
            hideModal={this.hideModal}
            user={this.state.user.id}/>
        </div>
      </>
    )
  }
}

export default gymLocations