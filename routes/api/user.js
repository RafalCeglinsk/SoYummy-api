import express from 'express'
import { subscribe } from '../../controllers/user/subscribe.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

router.patch('/subscribe', auth, subscribe)

export { router }
