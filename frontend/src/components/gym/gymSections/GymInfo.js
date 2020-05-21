import React from 'react'

const GymInfo = ({data, status}) => {
  console.log(data)
  const showSection = status? 'display-block' : 'display-none'
  return (
<>
    <div className={`${showSection} gym-show-info`}>
    <div className='gym-info-main'>
    <h1>{data.name}</h1>
      <p>{data.location}</p>
      <p>status:{data.bussinessStatus}</p>
      <p>rating: {data.rating}</p>
      <p>phone number: {data.formatted_phone_number}</p>
      {/* <p>opening hours:{data.opening_hours}</p> */}
    </div>
    </div>
    </>
  )
}



export default GymInfo