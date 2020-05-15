import React from 'react'
import MapGl, { Marker } from 'react-map-gl'
// import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {

  render() {

    return (
      <MapGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height={'100vh'} //* takes any valid css sizing for the map
        width={'100vw'}
        mapStyle='mapbox://styles/mapbox/light-v10'
        latitude={51.515}
        longitude={-0.078}
        zoom={13} // * between (very out) 1 - 20 (very in)
      >
        <Marker
          latitude={51.515}
          longitude={-0.078}
        >
          <span role="img" aria-label="marker">🐳</span>
        </Marker>
        
      </MapGl>
    )
  }
}

export default Map
