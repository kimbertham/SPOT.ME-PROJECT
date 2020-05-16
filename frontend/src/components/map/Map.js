import React from 'react'
import axios from 'axios'
import MapGl, { Marker } from 'react-map-gl'
// import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Link} from 'react-router-dom'


class Map extends React.Component {
  state = {
    viewport: {
    latitude: 51.515,
    longitude: -0.078,
    width: '80vw',
    height: '80vh',
    zoom: 13
    },

    popUp: false,
    id: '',
    data :{}
    
  }


  async handeClick(id)  {

    try {
      const gymId = id
      const response = await axios.post(`/api/locations/${gymId}`)
      const data = response.data
      this.setState({data, popUp:true} )
    } catch (err) {
      console.log(err)
    }
    
  }


  hideModal = () => {
    this.setState({ popUp: false})
  }


  render() {
    const { viewport } = this.state
    const { location, name, adress, place_id} = this.state.data
    const modalClassName= this.state.popUp ? 'display-block': 'display-none'
    console.log(this.state)
    return (
      <>
      <MapGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/mapbox/light-v10'
        { ...viewport }
        onViewportChange= {viewport => {
          this.setState({ viewport })
        }}
      >

    {this.props.data.map(location => {
      return <Marker
          key={location.place_id}
          latitude={location.lat}
          longitude={location.lng}>
          <span role="img" aria-label="marker" 
          onClick={() =>{this.handeClick(location.place_id)}}
          >🐳</span>
        </Marker> 
        // </Link>
        })}
      </MapGl>
    
  
      <div className={`modal ${modalClassName}`}>
        <div className='gym-modal-info'>
          <div className='gym-modal-text'>
              <div onClick={this.hideModal} ><p> xxxx </p> </div> 
              <p>{name}</p>
              <p>{location}</p>
              <p>{adress}</p>
              <Link to={`/locations/${place_id}`}> see more...</Link>
          </div>
        </div>
      </div>
    

      </>
    )
  }
}

export default Map
