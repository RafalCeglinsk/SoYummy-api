import express from 'express'
import { subscribe } from '../../controllers/user/subscribe.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Subscribe
 *  description: Allows user to subscribe for updates via email
 */


/**
 * @openapi
 * /:
 *  post:
 *    summary: Add your email and subscribe
 *    tags: [Subscribe]
 *    parameters:
 *       - name: authorization
 *         in: header
 *         security:
 *           - bearerAuth: []
 *         description: User token
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required: [email]
 *         properties:
 *              email:
 *                  type: string
 *    responses:
 *     200:
 *       description: OK
 *       content:
 *         application/json:
 *           example: subscription':'email
 *     401:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example: Unauthorized
 *     409:
 *       description: Conflict
 *       content:
 *         application/json:
 *           example: You are already subscribed to the newsletter
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 */
router.patch('/subscribe', auth, subscribe)

export { router }
