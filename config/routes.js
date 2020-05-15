const router = require('express').Router()
const auth = require('../controllers/authorization')
const locations = require('../controllers/locations')

router.route('/login')
  .post(auth.login)


router.route('/register')
  .post(auth.register)


// --------------- ROUTES FOR GETTING FACITILY DATA FROM GOOGLE --------------

router.route('/locations')
  .get(locations.getLocalFacilityData)


module.exports = router