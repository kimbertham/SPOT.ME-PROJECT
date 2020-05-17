import React from 'react'
import MapGl, { Marker } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Link } from 'react-router-dom'

class Map extends React.Component {
  state = {
    // viewport: {
    //   latitude: 51.509865,
    //   longitude: -0.118092,
    //   width: '80vw',
    //   height: '80vh',
    //   zoom: 12
    // },
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
    const { viewport, modal } = this.state
    const { longitude,latitude } = this.props
    const { name , location, businessStatus, place_id } = this.state.data
    const modalClassName = modal ? 'display-block' : 'display-none'
    console.log(this.state.data)
    return (
      <>
        <MapGl
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/mapbox/light-v10'
        
          {...this.props.viewport}

          // longitude={longitude ? longitude : -0.118092  }
          // latitude={latitude ? latitude : 51.509865 }
        
          // onViewportChange= {viewport => {
          //   this.setState({ viewport })
          // }}

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
          <div className='gym-modal-info'>
            <div className='gym-modal-text'>
              <div onClick={this.hideModal}><p>xxx</p></div>
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
