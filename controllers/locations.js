const axios = require('axios')
// const httpRequest = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?parameters&key=AIzaSyAmR3drNq7VbhNZTH1e0esR4oTQZrIIoMI&radius=5000&location=51.5055,0.0754&language=en&keyword=swimming&fields=formatted_address,name'



// -----------------------  GET REQUEST FROM FRONT END ('/locations') ------------------------
// ----------- returns array of locations which have been cleaned up to be saved in state ----
// REQUIRES A BODY = {
// keyword: String,
// radius: number,
// latitude: number,
// longitude: number,
// }
async function getLocalFacilityData(req, res) {
  const googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  const apiKey = 'AIzaSyAmR3drNq7VbhNZTH1e0esR4oTQZrIIoMI'
  const keyWord = req
  const radius = req.body.radius
  const location = `${req.body.lat},${req.body.lon}`
  const fields = 'formatted_address,name'
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

    const locationData = response.data.results
    const cleanedUpData = locationData.map(location => {
      return ({
        id: location.id,
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
    res.status(404).json(err)
  }
}


// -----------------------  GET REQUEST FROM FRONT END ('/locations/id') ------------------------
// ------------- returns ONE location which has been cleaned up to be saved in state -----------
// REQUIRES A BODY = {
// keyword: String,
// radius: number,
// latitude: number,
// longitude: number,
// }

async function getOneFacility(req, res) {
  const googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  const apiKey = 'AIzaSyAmR3drNq7VbhNZTH1e0esR4oTQZrIIoMI'
  const keyWord = req
  const radius = req.body.radius
  const location = `${req.body.lat},${req.body.lon}`
  const fields = 'formatted_address,name'
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

    const locationData = response.data.results
    const cleanedUpData = locationData.map(location => {
      return ({
        id: location.id,
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
    res.status(404).json(err)
  }
}








module.exports = {
  getLocalFacilityData: getLocalFacilityData,
  getOneFacility: getOneFacility
}