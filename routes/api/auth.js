import express from 'express'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

import { register } from '../../controllers/auth/register.js'
import { login } from '../../controllers/auth/login.js'
import { current } from '../../controllers/auth/current.js'
import { logout } from '../../controllers/auth/logout.js'

router.post('/register', register)
router.post('/login', login)
router.get('/current', auth, current)
router.post('/logout', auth, logout)

export { router }
