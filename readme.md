# So-yummy-api
### Backend application

So-yummy-api serves as the backbone for the So-yummy App, a platform dedicated to cooking aficionados and recipe management. It offers essential server-side functionalities to empower the frontend application.

# Technologies
- Node.js and Express.js: Providing server-side JavaScript runtime and web framework.

- MongoDB: Storing recipes, user information, and other critical data.

- Mongoose: Facilitating MongoDB object modeling.

- Swagger UI Express: Documenting and visualizing the API through Swagger documentation.

- Additional dependencies including axios, bcryptjs, cloudinary, cors, dotenv, express, gravatar, joi, joi-objectid, jsonwebtoken, mongoose, morgan, multer, nanoid, nodemailer, passport, passport-jwt, swagger-jsdoc and swagger-ui-express contribute to various functionalities within the backend.

# Installation
1. Clone repository:
```shell
git clone git@github.com:RafalCeglinsk/SoYummy-api.git
```
2. Navigate to the project directory:
```shell
cd SoYummy-api

```
3. Install the dependenciest:
```shell
npm install
```
4. Configure environment variables by creating a .env file in the root of the project and providing the necessary values. Refer to the .env.example file for the required variables.

```shell
DB_HOST=example: mongodb+srv://......
PORT_SERVER=example: 5000
TOKEN_KEY=example: tajny2
SECRET_KEY=example: tajny2
NODEMAILER_SERVICE=example: hotmail
NODEMAILER_HOST=example: smtp-mail.outlook.com
NODEMAILER_PORT=example: 587
NODEMAILER_AUTH_USER=example: your-email
NODEMAILER_AUTH_PASS=example: your-password
NODEMAILER_FROM_MAIL=example: your-email
CLOUDINARY_CLOUD_NAME=example: your-cloud-name
CLOUDINARY_API_KEY=example: your-api-key
CLOUDINARY_API_SECRET=example: your-api-secret
CLOUDINARY_API_ENVIRONMENT_VARIABLE=example: your-api-env-var

```

5. Start the development server:
```shell
node server.js
```

6. This will launch the backend server on the specified port (default is 3001) and establish a connection to the MongoDB database.

7. Swagger documentation is available at:
```shell
http://localhost:5000/api-docs
```


# Authentication Endpoints
## User Management

### /auth

POST /register - Register a new user

POST /login - Login user

GET /current - Current user (requirement: auth token bearer)

POST /logout - Logout user (requirement: auth token bearer)

### /users

PATCH /subscribe - Update subscription user (requirement: auth token bearer)


# Recipes Endpoints
## Recipe Operations

### /recipes

GET /:recipeID - Get recipe by id

GET /categories - Category list sorted alphabetically

GET /:category - Show 8 recipes from choose category

GET /main-page - Show 4 recipes per category

GET /search/?title=name - Find recipe by title


# Ingredients Endpoints
### /ingredients
GET /list - Get all ingredients

GET /?ingredients=Lamb - Find ingredients by name (requirement: auth token bearer)

# Favorite Recipes Endpoints
### /favorites
POST / - Add recipe to favorites list user (requirement: auth token bearer)

GET / - Get all recipes from favorites list (requirement: auth token bearer)

DEL /:recipeID - Remove recipe from favorites list  (requirement: auth token bearer)

# Popular Recipe Endpoints
### /popular
GET / - Get all popular recipes

# Shopping List Endpoints
### /shopping-lists
POST / - Add ingredients to shopping-lists (requirement: auth token bearer)

GET / - Get all ingredients from shopping-lists (requirement: auth token bearer)

DEL /ingredientId - Remove ingrendient from shopping list (requirement: auth token bearer)

# Own Recipe Endpoints
### /ownRecipes
POST / - Add own recipe to database (requirement: auth token bearer)

GET / - Get all own recipes (requirement: auth token bearer)

DEL /:recipe_id - Remove own recipe (requirement: auth token bearer)


# Developers
- github: [Rafał Cegliński](https://www.github.com/RafalCeglinsk) - Team lead & Developer
- github: [Michał Stanaszek](https://www.github.com/MichalStanaszek) - Scrum master & Developer
---
- github: [Krzysztof Kryczka](https://www.github.com/krzysztof-kryczka) - Backend developer
- github: [Marta Kowalska](https://www.github.com/KowalskaMarta) - Backend developer
---

- github: [Zuzanna Maciejczyk](https://www.github.com/Zjadlbyscos) - Frontend developer
- github: [Mikołaj Bajdalski](https://www.github.com/MikolajBajdalski) - Frontend developer
- github: [Michał Szmajduch](https://www.github.com/MichalSzmajduch) - Frontend developer
- github: [Piotr Dubiel](https://www.github.com/PiotrD1994) - Frontend developer
- github: [Stefan Bielak](https://www.github.com/StefanBielak) - Frontend developer
- github: [Kamil Kucharczyk](https://www.github.com/KamilKucharczyk) - Frontend developer

## So-yummy App
### Frontend application
```shell
git@github.com:RafalCeglinsk/So-Yummy.git
```

The So-yummy app was created for recipe lovers. After logging in, the user receives access to the recipe database by category.
You can add your own recipes.
The application contains a list of favorites and popular recipes based on logged in users' data.