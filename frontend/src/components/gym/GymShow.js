import React from 'react'
import axios from 'axios'
import { get } from 'mongoose'

class gymShow extends React.Component {
  state={
    data : {
    bussinessStatus:'',
    location:'',
    name:'',
    rating:'',
    reviews:[],
    type:'',
    photos: [],
      },
    photosRaw: []
  }

async componentDidMount() {
  try {
      const gymId = this.props.match.params.placeId
      const response = await axios.post(`/api/locations/${gymId}`)
      const data = response.data
      console.log(response.data)
      this.setState({data})
      await this.getImage()
    } catch (err) {
      console.log(err)
    }
}

  async getImage(){
  const images = this.state.data.photos
  const photosRaw = await Promise.all( images.map(photo => {
    const response = axios.post(`/api/locations/:placeId/${photo.photo_reference}`)
    return response
  }))
  this.setState({ photosRaw})
  console.log(this.state.photosRaw[0].data)
}


render() {
  const {bussinessStatus, location,name,rating,reviews,type} = this.state.data
  // const test = URL.createObjectURL(this.state.photosRaw[0])
  // const img = document.createElement('img');
  // img.src = 'data:image/jpeg;base64,' + btoa(`${this.state.photosRaw[0].data}`);
  
  return (  
    <div className='gym-show-page'>
      
      <div className='gym-show-imgs'>
      {/* <img src={`${this.state.photosRaw[0].data}`}/> */}
      </div>
      
      <div className='gym-show-info'>
        <div className='gym-info-header'>
          <h1>{name}</h1>
        </div>
        <div className='gym-info-main'>
          <p> location: {location}</p>
          <p>status:{bussinessStatus}</p>
          <p>rating:{rating}</p>
        </div>
        <div className='review'>
          <h1>Reviews</h1>
          {reviews.map(review => {
            return <div className='review-field' key={review.author_name}>
            <p> name: {review.author_name} </p>
            <p> rating: {review.rating} </p>
            <p>time: {review.relative_time_description}</p>
            <p>review:{review.text}</p>
          </div>
          })}
        </div>
      </div>


    </div>
    ) 
  }
}
export default gymShow