const router = require('express').Router()
const auth = require('../controllers/authorization')
const locations = require('../controllers/locations')
// const secureRoute = require('../lib/secureRoute') - uncomment when needed


router.route('/login')
  .post(auth.login)

router.route('/register')
  .post(auth.register)

// --------------- ROUTES FOR GETTING FACITILY DATA FROM GOOGLE --------------

router.route('/locations')
  .post( locations.getLocalFacilityData) 

router.route('/locations/co')
  .post(locations.getCoOrdinates)

router.route('/locations/:placeId')
  .post(locations.getOneFacility) 
  
router.route('/locations/:placeId/:photoId')
  .post(locations.getPhotos)



module.exports = router