import React from 'react'
import axios from 'axios'
// import { get } from 'mongoose' //* I don't think this is a thing - Tom

class gymShow extends React.Component {
  state={
    data: {
      bussinessStatus: '',
      location: '',
      name: '',
      rating: '',
      reviews: [],
      type: '',
      photos: []
    },
    photoReferences: []
    
  }

  async componentDidMount() {
    try {
      const gymId = this.props.match.params.placeId
      const response = await axios.post(`/api/locations/${gymId}`)
      const data = response.data
      console.log(response.data)
      this.setState({ data })
      await this.getImages()
    } catch (err) {
      console.log(err)
    }
  }

  async getImages(){
    const images = this.state.data.photos
    // * I cleaned this up, please check if it works - Tom
    // const photoReferences = []
    // images.map(photo => {
    //   photoReferences.push(photo.photo_reference)
    // })
    const photoReferences = images.map(photo => photo.photo_reference)
    this.setState({ photoReferences })
  }


  render() {
  // * I took out the unused 'type' from the const - Tom
  const { bussinessStatus, location, name, rating, reviews } = this.state.data
    // const test = URL.createObjectURL(this.state.photosRaw[0])
    // const img = document.createElement('img');
    // img.src = 'data:image/jpeg;base64,' + btoa(`${this.state.photosRaw[0].data}`);
    // console.log(this.state)
    return (  
      <div className='gym-show-page'>  
        <div className='gym-show-imgs'>
        </div>
        {this.state.photoReferences.map(photo => {
          return <img key={photo} alt="place" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A`}></img>
        })}

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