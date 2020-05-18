const axios = require('axios')
// const httpRequest = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?parameters&key=AIzaSyAmR3drNq7VbhNZTH1e0esR4oTQZrIIoMI&radius=5000&location=51.5055,0.0754&language=en&keyword=swimming&fields=formatted_address,name'
// const apiKey = 'AIzaSyBoze6uLA1t1ok4V5CmHGknNK2eYCpcv7w'
const apiKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'


// -----------------------  GET REQUEST FROM FRONT END ('/locations') ------------------------
// ----------- returns array of locations which have been cleaned up to be saved in state ----
// REQUIRES A BODY = {
// keyword: String,
// radius: number,
// latitude: number,
// longitude: number,
// }
async function getLocalFacilityData(req, res, next) {
  console.log('RECIEVED')
  const googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  const keyWord = req.body.keyword
  const radius = req.body.radius
  const location = `${req.body.latitude},${req.body.longitude}`
  const fields = 'formatted_address'
  try {
    const response = await axios.get(googlePlacesURL, {
      params: {
        key: apiKey,
        radius: radius,
        location: location,
        keyword: keyWord,
        fields: fields
      }
    })

    if (!response){
      throw new Error('Not Found')
    }
    // If Google returns an array of locations:
    const locationData = response.data.results
    const cleanedUpData = locationData.map(location => {
      return ({
        place_id: location.place_id,
        name: location.name,
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
        rating: location.rating,
        ratingAmount: location.user_ratings_total,
        type: location.types,
        location: location.vicinity,
        openingHours: location.opening_hours
      })
    })

    res.status(200).json(cleanedUpData)
  } catch (err) {
    next(err)
  }
}


///---------get the coordinates ( lat and lon ) from the postcode search input ( /locations) -------------
async function getCoOrdinates(req, res) {
  console.log('got ya boi')
  const googleGeoURL = 'https://maps.googleapis.com/maps/api/geocode/json?'
  const address = req.body.address
  try {
    const response = await axios.get(googleGeoURL, { params: { key: apiKey, address: address } })
    const data  = response.data.results[0].geometry.location ///
    res.json(data)
  } catch (err) {
    console.log(err)
  }
}

// -----------------------  GET ONE LOCATION REQUEST FROM FRONT END ('/locations/places_id') ------------------------
// ------------- returns ONE location which has been cleaned up to be saved in state -----------
// REQUIRES A BODY = {
// places_id: String
// }

async function getOneFacility(req, res) {
  // console.log('GOT')
  const googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/details/json?'
  const placeId = req.params.placeId
  // console.log(placeId)
  
  const fields = 'formatted_address,name,business_status,place_id,type,opening_hours,rating,price_level,geometry,review,photos,formatted_phone_number'
  
  try {
    const response = await axios.get(googlePlacesURL, {
      params: {
        key: apiKey,
        place_id: placeId,
        fields: fields
      }
    })
    // console.log(response.data.result)

    const data = response.data.result
    const locationObject = {
      place_id: data.place_id,
      name: data.name,
      lat: data.geometry.location.lat,
      lng: data.geometry.location.lng,
      rating: data.rating,
      ratingAmount: data.user_ratings_total,
      type: data.types,
      location: data.formatted_address,
      businessStatus: data.business_status,
      reviews: data.reviews,
      photos: data.photos,
      opening_hours: data.opening_hours,
      formatted_phone_number: data.formatted_phone_number
    }

    res.status(200).json(locationObject)
  } catch (err) {
    res.status(404).json(err)
  }
}


module.exports = {
  getLocalFacilityData: getLocalFacilityData,
  getOneFacility: getOneFacility,
  getCoOrdinates
}