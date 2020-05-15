import React from 'react'
import MapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
const ApiKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'

class gymMap extends React.Component {
  state = {
    search: {
      radius : '',
      location : '',
      language : '',
      keywords : '',
      fields : ''
    }
  }

  // async componentDidMount(){
  //   const {radius, location, language, keywords, fields} = this.state
  //   try {
  //     const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?
  //     key=${ApiKey}&
  //     radius=${radius}}&
  //     location=${location}}&
  //     language=${language}&
  //     keyword=${keywords}&
  //     fields=${fields}`
  //     )
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


render() {
  return (
    <h1> test </h1>
    )
  }
}

export default gymMap
