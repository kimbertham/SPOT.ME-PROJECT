const router = require('express').Router()
const auth = require('../controllers/authorization')
const locations = require('../controllers/locations')
const posts = require('../controllers/posts')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')
const groups = require('../controllers/groups')
const follow = require('../controllers/follow')
const newsFeed = require('../controllers/newsFeed')


router.route('/login')
  .post(auth.login)

router.route('/register')
  .post(auth.register)


// --------------- ROUTES FOR GETTING LOCATION DATA FROM GOOGLE --------------

router.route('/locations')
  .post( locations.getLocalFacilityData) 

router.route('/locations/co')
  .post(locations.getCoOrdinates)

router.route('/locations/:placeId')
  .post(locations.getOneFacility) 
  

// --------------- ROUTES FOR MAKING/DELETE POSTS AND LIKES AND FOLLOWS --------------

router.route('/profile/:userId/post')
  .post(secureRoute, posts.newPost)


router.route('/profile/:userId/post/:postId')
  .delete(secureRoute, posts.deletePost)


router.route('/profile/:userId/post/:postId')
  .put(secureRoute ,posts.addLike)

// --------------- ROUTE FOR USER PROFILE --------------


router.route('/profile/:userId/edit')
  .post(users.userUpdate)

router.route('/profile/:userId')
  .get(users.show)


router.route('/profile/:userId/follow')
  .put(secureRoute, follow.toggleFollow)

// --------------- ROUTES FOR GROUPS (CREATING,JOINING,DELETING) --------------
router.route('/groups/new/:userId')
  .post(secureRoute ,groups.new)

router.route('/groups/:groupId/:userId')
  .delete(secureRoute ,groups.delete)

router.route('/groups/:groupId/join/:userId')
  .put(secureRoute ,groups.join)

router.route('/groups/:groupId/leave/:userId')
  .put(secureRoute ,groups.leave)

// ------------ ROUTES FOR POSTING IN GROUP -----------------

router.route('/groups/:groupId/post/:userId')
  .post(secureRoute ,groups.post)

router.route('/groups/:groupId/post/:postId/delete')
  .delete(secureRoute ,groups.deletePost)

router.route('/groups/:groupId/post/:postId/like')
  .put(secureRoute ,groups.like)


// ------------ ROUTES FOR NEWS FEED -----------------

router.route('/news')
  .get(secureRoute ,newsFeed.getNewsFeed)


module.exports = router