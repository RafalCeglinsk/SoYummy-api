import { app } from './app.js'
import { connectToDatabase } from './utils/connection.js'
import dotenv from 'dotenv'
dotenv.config()

const { DB_HOST, PORT_SERVER = 3001 } = process.env

const runServer = async () => {
  try {
    await connectToDatabase(DB_HOST)
    console.log(`Database connection successful`)

    app.listen(PORT_SERVER, () => {
      console.log(`Server running. Listening on port: ${PORT_SERVER}`)
      console.log(
        `
      This is a simple CRUD API application made with Express and documented with Swagger.

      Docs available at http://localhost:${PORT_SERVER}/api-docs

      API command list:
      
      Developer server: ===> http://localhost:${PORT_SERVER}/api

      /auth
         @POST /register - registration user
         @POST /login - login user 
         @GET /current - current user (requirement: auth token bearer)
         @POST /logout - logout user (requirement: auth token bearer)
      /users
         @PATCH /subscribe - update subscription user (requirement: auth token bearer)
      /recipes
         @GET /:recipeID - get one recipe by id 
         @GET /categories - category list sorted alphabetically
         @GET /:category - show 8 recipes from choose category
         @GET /main-page - show 4 recipes per category 
         @GET /search/?title=name - find recipe by title
      /ingredients
         @GET /list - get all ingredients
         @GET /?ingredients=Lamb find ingredients by name (requirement: auth token bearer)
      /favorites
         @POST / - add recipe to favorites list user (requirement: auth token bearer)
         @GET / - get all recipes from favorites list (requirement: auth token bearer)
         @DEL /:recipeID - remove recipe from favorites list  (requirement: auth token bearer)
      /popular
         @GET / - get all popular recipes 
      /shopping-lists
         @POST / - add ingredients to shopping-lists (requirement: auth token bearer)
         @GET / - get all ingredients from shopping-lists (requirement: auth token bearer)
         @DEL /ingredientId - remove ingrendient from shopping list (requirement: auth token bearer)
      /ownRecipes
         @POST / - add own recipe to database (requirement: auth token bearer)
         @GET / - get all own recipes (requirement: auth token bearer)
         @DEL /:recipe_id - remove own recipe 
`
      )
    })
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  }
}

runServer()
