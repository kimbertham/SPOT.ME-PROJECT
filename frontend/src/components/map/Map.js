import React from 'react'
import MapGl, { Marker } from 'react-map-gl'
// import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {
  state = {
    viewport: {
    latitude: 51.515,
    longitude: -0.078,
    width: '80vw',
    height: '80vh',
    zoom: 13
    }
  }



  handeClick = event => {
    console.log('clicked')
  }

  render() {
    const { viewport } = this.state
    return (
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
          <span role="img" aria-label="marker" onClick={this.handeClick}>🐳</span>
        </Marker>
        })}
        
      </MapGl>
    )
  }
}

export default Map
