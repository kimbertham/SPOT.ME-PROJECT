import React from 'react'
import MapGl, { Marker } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Link } from 'react-router-dom'

class Map extends React.Component {
  state = {
    modal: false,
    data: []
  }

  async handleModal(id) { 
    this.setState({ modal: true })
    try {
      const response = await axios.post(`/api/locations/${id}`) 
      this.setState({ data: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  hideModal=()=>{
    this.setState({ modal: false })
  }

  render() {
    const { modal } = this.state
    const { name , location, businessStatus, place_id } = this.state.data
    const modalClassName = modal ? 'display-block' : 'display-none'
    return (
      <>
        <MapGl
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/mapbox/light-v10'
          {...this.props.viewport}
          onViewportChange={this.props.moveMap}
        >
          {this.props.data.map((location) => {
            return <Marker
              key={location.place_id}
              latitude={location.lat}
              longitude={location.lng}>
              <span role="img"
                aria-label="marker"
                onClick={() =>this.handleModal(location.place_id)}
              >🐳</span>
            </Marker>
          })}
        </MapGl>
        <div className={`modal ${modalClassName}`}>
          <div className='gym-modal-info modal-info'>
            <div className='gym-modal-text'>
              <div className="close" onClick={this.hideModal}><p>X</p></div>
              <p>{name}</p>
              <p>{location}</p>
              <p>{businessStatus}</p>
              <Link to={`/locations/${place_id}`} > <p>see more...</p></Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Map
