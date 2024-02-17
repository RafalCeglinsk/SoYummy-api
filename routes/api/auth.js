import express from 'express'
const router = express.Router()

import { register } from '../../controllers/auth/register.js'
import { login } from '../../controllers/auth/login.js'
import { current } from '../../controllers/auth/current.js'
import { logout } from '../../controllers/auth/logout.js'

router.post('/register', register)
router.post('/login', login)
router.get('/current', current)
router.post('/logout', logout)

export { router }
