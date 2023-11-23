const {
  startConversation,
  getConversations,
} = require("../controllers/conversation-controller");
const { authMiddleware } = require("../middleware/jwt-config");

const router = require("express").Router();

router.get("/:userId", authMiddleware, getConversations); //To get all conversation related to a user

router.post("/", authMiddleware, startConversation); //To start a new conversation


/**
 * @swagger
 * /cs/{userId}:
 *   get:
 *     security:
 *     - Authorization: []
 *     tags:
 *       - Conversations
 *     summary: Get all conversations related to a user
 *     description: Retrieves all conversations related to a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID for retrieving conversations.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns conversations related to the user.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found or conversations not available.

 * @swagger
 * /cs:
 *   post:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Conversations
 *     summary: Start a new conversation
 *     description: Starts a new conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               members:
 *                 type: array
 *                 description: Array of members participating in the conversation.
 *                 items:
 *                   type: string
 *                   description: User IDs of members in the conversation.
 *             example:
 *               members: ["userID1", "userID2"]
 *     responses:
 *       '200':
 *         description: Successful. Conversation started.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '400':
 *         description: Bad request. Conversation could not be started.
 */

module.exports = router;
