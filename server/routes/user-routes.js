const router = require('express').Router();

const { 
    getUser
    ,getUserFollowers
    ,getUserFollowings
    ,addRemoveFollow
    ,getUsers
} = require('../controllers/user-controller');

/**=========== post controller to get a user's posts ============== */
const { getUserPosts } = require('../controllers/post-controller')

/**=========== Middleware to verify signed in users ============== */
const { authMiddleware } = require('../middleware/jwt-config');


/**=========== READ ============== */
    router.get('/', authMiddleware,getUsers)
    router.get('/:usernameorid',authMiddleware, getUser); //get a single user
    router.get('/:username/posts', authMiddleware, getUserPosts) // get a user's posts

    router
        .route('/:userId/followings')
        .get(authMiddleware,getUserFollowings) // get a user's current following list by username or id
        .patch(authMiddleware,addRemoveFollow) // to toggle follow

    router
        .route('/:userId/followers')
        .get(authMiddleware,getUserFollowers) //To get a user's follower list by username or id


/**
 * @swagger
 * /u/{username}:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Users
 *     summary: Get users by usernames -> for search box
 *     description: Retrieves users by their usernames.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns the user with the specified username.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found with the specified username.

 * @swagger
 * /u/{usernameorid}:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Users
 *     summary: Get a single user by username or ID
 *     description: Retrieves a user by their username or ID.
 *     parameters:
 *       - in: path
 *         name: usernameorid
 *         required: true
 *         description: Username or ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns the user with the specified username or ID.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found with the specified username or ID.
 
 * @swagger
 * /u/{username}/posts:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Users
 *     summary: Get a user's posts by username
 *     description: Retrieves posts belonging to a user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user whose posts to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns posts belonging to the user with the specified username.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found with the specified username or no posts available.

 * @swagger
 * /u/{userId}/followings:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Users
 *     summary: Get a user's current following list by user ID
 *     description: Retrieves the list of users that the specified user is following.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user whose following list to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns the current following list of the user.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found with the specified ID or no followings available.

 *   patch:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Users
 *     summary: Toggle follow for a user
 *     description: Allows the user to toggle follow status for another user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user performing the follow action.
 *         schema:
 *           type: string
 *       - in: body
 *         name: followData
 *         required: true
 *         description: User ID of the user to follow/unfollow.
 *         schema:
 *           type: object
 *           properties:
 *             followingId:
 *               type: string
 *               description: ID of the user to follow/unfollow.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: string
 *                 description: ID of the user to follow/unfollow.
 *     responses:
 *       '200':
 *         description: Successful. Follow status toggled.
 *       '400':
 *         description: Bad request. Invalid follow action.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found with the specified ID or no followings available.

 * @swagger
 * /u/{userId}/followers:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Users
 *     summary: Get a user's follower list by user ID
 *     description: Retrieves the list of users who are following the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user whose follower list to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns the follower list of the user.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found with the specified ID or no followers available.
 */


module.exports= router;

