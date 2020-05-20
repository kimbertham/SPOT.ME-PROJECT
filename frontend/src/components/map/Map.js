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
//   handleFlyTo = () => {
//     this.map.flyTo({ center: [-118.4107187, 33.9415889] })
// }

  
  hideModal=()=>{
    this.setState({ modal: false })
  }

  render() {
    // console.log(this.map)
    const { modal } = this.state
    const { name , location, businessStatus, place_id } = this.state.data
    const modalClassName = modal ? 'display-block' : 'display-none'
    // console.log(this.state.data)
    return (
      <>
        <MapGl
          className="map"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/mapbox/light-v10'
          ref={(map) => { this.map = map }}
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

          {/* <button onClick={() => {this.map.state.map.flyTo()}}>fly</button> */}

        <div className={`modal ${modalClassName}`}>
          <div className='gym-modal-info modal-info'>
            <div className='gym-modal-text'>
              <div onClick={this.hideModal}><p className='close'>X</p></div>
              <h1>{name}</h1>
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
