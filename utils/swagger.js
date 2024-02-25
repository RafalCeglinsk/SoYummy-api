import swaggerUI from 'swagger-ui-express'
import swaggerJSDocs from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'So-Yummy Recipes app',
      version: '1.0.0',
      description:
        'So-yummy-api serves as the backbone for the So-yummy App, a platform dedicated to cooking aficionados and recipe management. It offers essential server-side functionalities to empower the frontend application.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Grupa projektowa 2',
        email: '',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/api/*.js', './schemas/*.js'],
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
