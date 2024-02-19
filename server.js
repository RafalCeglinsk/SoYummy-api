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
         @POST /register - registration user {json (name, email, password)}
         @POST /login - login user {json (email, password)}
         @GET /current - current user {header Authorization: Bearer token}
         @POST /logout - logout user {header Authorization: Bearer token}
      /users
         @PATCH /subscribe - update subscription user {json (email) + header Authorization: Bearer token}
      /recipes
         @GET /categories - category list sorted alphabetically {no parameters}
         
      `
      )
    })
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  }
}

runServer()
