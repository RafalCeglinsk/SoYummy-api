import swaggerUI from 'swagger-ui-express'
import swaggerJSDocs from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'REST API Docs',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Grupa projektowa 2',
        email: '',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/api/*.js'],
}

// swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDocs(options)

export function swagger(app) {
  // Swagger page
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  // Docs in JSON format
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
