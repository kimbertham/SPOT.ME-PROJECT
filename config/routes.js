const router = require('express').Router()
const auth = require('../controllers/authorization')
const locations = require('../controllers/locations')
const posts = require('../controllers/posts')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')
const groups = require('../controllers/groups')
const follow = require('../controllers/follow')
const newsFeed = require('../controllers/newsFeed')
const messages = require('../controllers/messages')
const search = require('../controllers/search')


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

// if you are adding/removing comments to a Group post, refer to the group controller and routes below
router.route('/profile/:ownerId/post/:postId/comment')
  .put(secureRoute, posts.addComment)

router.route('/profile/:ownerId/post/:postId/comment/:commentId')
  .delete(secureRoute, posts.removeComment)

// --------------- ROUTE FOR USER PROFILE --------------


router.route('/profile/:userId/edit')
  .post(users.userUpdate)

router.route('/profile/:userId')
  .get(users.show)

router.route('/groups')
  .get(secureRoute ,users.getUsersGroups)

router.route('/profile/:userId/follow')
  .put(secureRoute, follow.toggleFollow)

router.route('/profile/:userId/getFollowers')
  .get(follow.getFollowers
  )


// --------------- ROUTES FOR GROUPS (CREATING,JOINING,DELETING) --------------

router.route('/groups/:groupId')
  .get(groups.showGroup)

router.route('/groups/new')
  .post(secureRoute ,groups.new)

router.route('/groups/:groupId/:userId')
  .delete(secureRoute ,groups.delete)

router.route('/groups/:groupId/join/:userId')
  .put(secureRoute ,groups.join)

router.route('/groups/:groupId/leave/:userId')
  .put(secureRoute ,groups.leave)

router.route('/groups/:groupId/edit')
  .put(secureRoute ,groups.edit)  

// ------------ ROUTES FOR POSTING IN GROUP AND LIKING/COMMENTING -----------------

router.route('/groups/:groupId/post/:userId')
  .post(secureRoute ,groups.post)

router.route('/groups/:groupId/post/:postId/delete')
  .delete(secureRoute ,groups.deletePost)

router.route('/groups/:groupId/post/:postId/like')
  .put(secureRoute ,groups.likePost)

router.route('/groups/:groupId/post/:postId/comment')
  .put(secureRoute ,groups.addGroupPostComment)

router.route('/groups/:groupId/post/:postId/comment/:commentId')
  .delete(secureRoute ,groups.removeGroupPostComment)

router.route('/groups/:groupId/post/:postId/comment/:commentId/like')
  .put(secureRoute ,groups.likeComment)



// ------------ ROUTES FOR NEWS FEED -----------------

router.route('/news')
  .get(secureRoute ,newsFeed.getNewsFeed)


// ------------ ROUTES FOR MESSAGES -----------------

router.route('/messages')
  .get(secureRoute, messages.getAllMessages)

router.route('/messages/:userId/post/:recipentId')
  .post(secureRoute, messages.createMessage)

router.route('/messages/:userId/delete/:postId')
  .delete(secureRoute, messages.deleteMessage)



// ------------ ROUTES FOR SEARCHBAR -----------------

router.route('/search/:inputText')
  .get( search.results)




module.exports = router