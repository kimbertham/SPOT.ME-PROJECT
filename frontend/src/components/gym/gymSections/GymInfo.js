import React from 'react'
import Axios from 'axios'
import gymLocations from '../gymLocations'

const GymInfo = ({data}) => {
  console.log(data)
  return (
<>
    <div className='gym-show-info'>
    <div className='gym-info-main'>
    <h1>{data.name}</h1>
      <p>location:  {data.location}</p>
      <p>status:{data.bussinessStatus}</p>
      <p>rating: {data.rating}</p>
      <p>phone number: {data.formatted_phone_number}</p>
      <p>opening hours:{data.opening_hours}</p>
    </div>
    </div>

    <button>Follow!</button>
    </>
  )
}



export default GymInfo