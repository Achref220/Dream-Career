const { sendMessage, getMessages } = require('../controllers/message-controller');
const { authMiddleware } = require('../middleware/jwt-config');

const router = require('express').Router();


router.post('/',authMiddleware,sendMessage) //To send a new message
router.get('/:conversationId', authMiddleware, getMessages) //To get all messages related to a conversation




/**
 * @swagger
 * /msg:
 *   post:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Messages
 *     summary: Send a new message
 *     description: Sends a new message within a conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversationId:
 *                 type: string
 *                 description: ID of the conversation.
 *               sender:
 *                 type: string
 *                 description: ID of the message sender.
 *               content:
 *                 type: string
 *                 description: Content of the message.
 *           example:
 *             conversationId: "conversationID1"
 *             sender: "userID1"
 *             content: "Hello, this is a message."
 *     responses:
 *       '200':
 *         description: Successful. Message sent.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '400':
 *         description: Bad request. Message could not be sent.
 */


/**
 * @swagger
 * /msg/{conversationId}:
 *   get:
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Messages
 *     summary: Get messages related to a conversation
 *     description: Retrieves all messages related to a specific conversation.
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         description: ID of the conversation to retrieve messages.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful. Returns messages related to the conversation.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Conversation not found or messages not available.
 */





module.exports = router;