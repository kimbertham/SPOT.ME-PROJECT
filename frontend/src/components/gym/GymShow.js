import React from 'react'
import axios from 'axios'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'




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
    photoReferences: [],
    mainImg:[]
    
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
    const photoReferences = []
    images.map(photo => {
      photoReferences.push(photo.photo_reference)
    })
    this.setState({ photoReferences })
    const imagesArray = this.state.photoReferences
    let index = 0
    this.setState({ mainImg :  this.state.photoReferences[1]})
  }

  changeImgs(){
    const imagesArray = this.state.photoReferences
    let index = 0

  }


  render() {
    const { bussinessStatus, location,name,rating,reviews,type } = this.state.data
    const settings = {
      dots: true,
      fade:true,
      infinite:true,
      speeds:500,
      slidesToShow:1,
      arrows:true,
      slidesToScroll:1,
      className:'slides',
      centerMode: true
 
    }
    return (  


      <div className='gym-show-page'>  
      

      <div className='slider-container'>
        <Slider {...settings}> 
        {this.state.photoReferences.map(photo => {
          return <div className='slide'>
          <img className='force-size-img' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A`}/>   
          </div> 
        })}
        </Slider>
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