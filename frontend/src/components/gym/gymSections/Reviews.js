import React from 'react'


const Reviews = ({reviews,status}) => {
  console.log(reviews)
  const showSection = status? 'display-block' : 'display-none'
  return (
    <div className={`${showSection} review-field`}>
    <h1>Reviews</h1>
    {reviews.length > 0? reviews.map(review => {
      return <div className='review-field' key={review.author_name}>
        <p> name:  {review.author_name} </p>
        <p> rating: {review.rating} </p>
        <p>time: {review.relative_time_description}</p>
        <p>review: {review.text}</p>
      </div>
    })  : 'No Reviews' } 
  </div>
  )
}

export default Reviews