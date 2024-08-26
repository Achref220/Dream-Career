const router = require("express").Router();

/**================Post controller=================== */
const {
  createPost,
  getFeedPosts,
  getPostLikes,
  addRemoveLike,
  editPost,
  deletePost,
  getPostById,
} = require("../controllers/post-controller");
const OpenAI = require("openai");

/**================Comment controller=================== */
const {
  addComment,
  getComments,
  removeComment,
  updateComment,
  addRemoveCommentLike,
} = require("../controllers/comment-controller");

/**================Image Storage Middleware=================== */
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

/**================Authentication Middleware=================== */
const { authMiddleware } = require("../middleware/jwt-config");

/**================isAuthor Middleware=================== */
const { isCommentAuthor, isPostAuthor } = require("../middleware/middleware");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in an environment variable
});

router.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    console.log("chat gpt working");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if you're using GPT-3.5
      messages,
    });

    res.json(completion.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
});

/**=========Posts================== */
router
  .route("/")
  .get(authMiddleware, getFeedPosts)
  .post(authMiddleware, upload.array("postImageUrls", 5), createPost);

router
  .route("/:id")
  .get(authMiddleware, getPostById)
  .put(authMiddleware, isPostAuthor, upload.array("newPostImages", 5), editPost)
  .delete(authMiddleware, isPostAuthor, deletePost);

/**============Likes=============== */
router
  .route("/:id/likes")
  .get(authMiddleware, getPostLikes)
  .patch(authMiddleware, addRemoveLike);

/**=========Comment============ */

router
  .route("/:postId/comments")
  .get(authMiddleware, getComments)
  .post(authMiddleware, addComment);

router
  .route("/:postId/comments/:commentId")
  .put(authMiddleware, isCommentAuthor, updateComment)
  .delete(authMiddleware, isCommentAuthor, removeComment);

/**========COMMENT LIKES============ */
router.patch(
  "/:postId/comments/:commentId/likes",
  authMiddleware,
  addRemoveCommentLike
);



/**
 * @swagger
 * /p:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Get feed posts
 *     description: Retrieves feed posts.
 *     responses:
 *       '200':
 *         description: Successful. Returns feed posts.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /p:
 *   post:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Create a post
 *     description: Creates a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user creating the post.
 *               username:
 *                 type: string
 *                 description: Username of the user creating the post.
 *               location:
 *                 type: string
 *                 description: Location information associated with the post.
 *               caption:
 *                 type: string
 *                 description: Caption or content of the post.
 *               userProfilePhoto:
 *                 type: string
 *                 description: URL of the user's profile photo.
 *               likes:
 *                 type: object
 *                 description: Object to store likes information (e.g., user IDs who liked the post).
 *               comments:
 *                 type: array
 *                 description: Array to store comments related to the post.
 *               postImageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs for the post.
 *           example:
 *             userId: "user_id_here"
 *             username: "example_username"
 *             location: "Example location"
 *             caption: "This is a post caption."
 *             userProfilePhoto: "profile_photo_url_here"
 *             likes: {}
 *             comments: []
 *             postImageUrls:
 *               - "image_url_1"
 *               - "image_url_2"
 *     responses:
 *       '200':
 *         description: Successful. Post created.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /p/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Get a post by ID
 *     description: Retrieves a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve.
 *     responses:
 *       '200':
 *         description: Successful. Returns the post.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to this post.
 *       '404':
 *         description: Post not found.

 *   put:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Update a post by ID
 *     description: Updates a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newPostImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of new image URLs for the post.
 *           example:
 *             newPostImages:
 *               - "new_image_url_1"
 *               - "new_image_url_2"
 *     responses:
 *       '200':
 *         description: Successful. Post updated.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to update this post.
 *       '404':
 *         description: Post not found.

 *   delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Delete a post by ID
 *     description: Deletes a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete.
 *     responses:
 *       '200':
 *         description: Successful. Post deleted.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to delete this post.
 *       '404':
 *         description: Post not found.
 */

/**
 * @swagger
 * /p/{id}/likes:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Get post likes by ID
 *     description: Retrieves likes of a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve likes.
 *     responses:
 *       '200':
 *         description: Successful. Returns post likes.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to view likes of this post.
 *       '404':
 *         description: Post not found.

  *   patch:
  *     security:
  *       - Authorization: []
  *     tags:
  *       - Posts
  *     summary: Add or remove like on a post by ID
  *     description: Adds or removes a like on a post by its ID.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: ID of the post to add or remove like.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *                 description: Username of the user performing like/unlike action.
  *           example:
  *             username: "user123"
  *     responses:
  *       '200':
  *         description: Successful. Like added or removed.
  *       '401':
  *         description: Unauthorized. User is not authenticated.
  *       '403':
  *         description: Forbidden. User does not have access to like or unlike this post.
  *       '404':
  *         description: Post not found.
 */

/**
 * @swagger
 * /p/{id}/comments:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Get comments by post ID
 *     description: Retrieves comments of a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve comments.
 *     responses:
 *       '200':
 *         description: Successful. Returns post comments.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to view comments of this post.
 *       '404':
 *         description: Post not found.

 *   post:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Add comment to a post by ID
 *     description: Adds a comment to a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to add a comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user adding the comment.
 *               username:
 *                 type: string
 *                 description: Username of the user adding the comment.
 *               postId:
 *                 type: string
 *                 description: ID of the post where the comment is being added.
 *               userProfilePhoto:
 *                 type: string
 *                 description: URL of the user's profile photo.
 *               commentBody:
 *                 type: string
 *                 description: Content of the comment.
 *           example:
 *             userId: "user123"
 *             username: "john_doe"
 *             postId: "post456"
 *             userProfilePhoto: "https://example.com/profile.jpg"
 *             commentBody: "This is a comment on the post."
 *     responses:
 *       '200':
 *         description: Successful. Comment added.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to comment on this post.
 *       '404':
 *         description: Post not found.

 * /p/{postId}/comments/{commentId}:
 *   put:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Update comment on a post by ID ------- NEED REWORK --------
 *     description: Updates a comment on a post by post ID and comment ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post containing the comment.
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Updated content of the comment.
 *           example:
 *             text: "Updated comment text."
 *     responses:
 *       '200':
 *         description: Successful. Comment updated.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to update this comment.
 *       '404':
 *         description: Post or comment not found.

 *   delete:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Posts
 *     summary: Delete comment on a post by IDs ------- NEED REWORK --------
 *     description: Deletes a comment on a post by post ID and comment ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post containing the comment.
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete.
 *     responses:
 *       '200':
 *         description: Successful. Comment deleted.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have access to delete this comment.
 *       '404':
 *         description: Post or comment not found.
 */




module.exports = router;
