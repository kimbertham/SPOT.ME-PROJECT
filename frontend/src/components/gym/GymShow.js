import React from 'react'
import axios from 'axios'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'

import Reviews from './gymSections/Reviews'
import GymNav from './gymSections/GymNav'
import GymInfo from './gymSections/GymInfo'


class gymShow extends React.Component {
  state={

    section: {
      reviews: false,
      members: false,
      directions:false,
      posts: false
      },

    data: {
      bussinessStatus: '',
      location: '',
      name: '',
      rating: '',
      reviews: [],
      type: '',
      photos: [],
      opening_hours: '',
      formatted_phone_number:''
    },

    photoReferences: [],
  }

  async componentDidMount() {
    try {
      const gymId = this.props.match.params.placeId
      const response = await axios.post(`/api/locations/${gymId}`)
      const data = response.data
      console.log(response.data)
      this.setState({ data, nav1: this.slider1, nav2: this.slider2 })
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
  }


  getSection = async page =>  {
    const section = { reviews: false, members: false, directions:false, posts: false}
    await this.setState({section})
    const sectionChange =  {...this.state.section, [page] : true }
    this.setState({section:sectionChange })
  }

  render() { 
    const baseUrl= 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
    const key='&key=AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'
    console.log(this.state)
    
    return (  
  <div className='gym-show-page'> 
    <div className='page-top'>
      
      <div className='gym-images'>
        <div className='slider-container'>
          <Slider 
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            className='slides'
            lazyLoad={true}
            slidesToShow={1}
            speeds={500}>
              {this.state.photoReferences.map(photo => {
                return <div className='slide'>
                  <img className='gym-img' src={`${baseUrl}${photo}${key}`}/></div> 
                })}
          </Slider>
            <div className='slider-two'>
          <Slider 
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={7}
            swipeToSlide={true}
            focusOnSelect={true}
            className='slides-two'> 
              {this.state.photoReferences.map(photo => {
                return <div className='slide-two'>
                <img className='slider-two-img' src={`${baseUrl}${photo}${key}`}/> </div> 
              })}
          </Slider>
        </div>
      </div>
    </div>
    <GymInfo data={this.state.data} />
  </div>

  <GymNav getSection={this.getSection} />

  <div className="changing-sections">
  <Reviews status={this.state.section.reviews} reviews={this.state.data.reviews}/>
  </div>

      </div>
    ) 
  }
}
export default gymShow