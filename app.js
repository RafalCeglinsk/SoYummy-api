import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { swagger } from './utils/swagger.js'
import { apiErrorHandler } from './utils/errors/api-error-handler.js'
import './config/config-passport.js'

import { router as authRouter } from './routes/api/auth.js'
import { router as usersRouter } from './routes/api/user.js'
import { router as recipesRouter } from './routes/api/recipes.js'
import { router as ingredientsRouter } from './routes/api/ingredients.js'
import { router as shoppingListRouter } from './routes/api/shoppingList.js'

const app = express()
swagger(app)

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/shopping-lists', shoppingListRouter)

app.use(apiErrorHandler)

export { app }
