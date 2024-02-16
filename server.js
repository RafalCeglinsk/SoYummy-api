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
    })
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  }
}

runServer()
