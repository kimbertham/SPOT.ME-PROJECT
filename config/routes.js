const router = require('express').Router()
const user = require('../controllers/users')
const locations = require('../controllers/locations')

router.route('/login')
  .post(user.login)


router.route('/register')
  .post(user.register)








// --------------- ROUTES FOR GETTING FACITILY DATA FROM GOOGLE --------------

router.route('/locations')
  .get(locations.getLocalFacilityData)


module.exports = router