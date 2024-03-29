import { Schema, Types, model } from 'mongoose'
import Joi from 'joi'
import objectId from 'joi-objectid'
Joi.objectId = objectId(Joi)

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // example@example.com

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    match: [emailRegexp, 'Invalid email format provided'],
    required: [true, 'Email is required'],
    index: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: [true, 'Set password for user'],
  },
  subscription: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: null,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  shoppingList: {
    _id: false,
    type: [
      {
        ingredientId: {
          type: Types.ObjectId,
          ref: 'ingredients',
          required: [true, 'Ingredient is required'],
        },
        recipeId: {
          type: Types.ObjectId,
          ref: 'recipe',
          required: [true, 'Recipe id is required'],
        },
        measure: {
          type: String,
          default: '',
          required: [true, 'Measure is required'],
        },
      },
    ],
    default: [],
  },
  favorites: [{ type: Types.ObjectId, ref: 'recipe' }],
})

export const User = model('user', userSchema)

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email format is: example@example.com',
  }),
})

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email format is: example@example.com',
  }),
  password: Joi.string().min(3).required(),
})

export const subscribeSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email format is: example@example.com',
  }),
})

export const shoppingListSchema = Joi.object({
  ingredientId: Joi.objectId().required(),
  recipeId: Joi.objectId().required(),
  measure: Joi.string().required(),
})

/**
 * @openapi
 * components:
 *  schemas:
 *   userRegister:
 *     type: object
 *     required:
 *             - name
 *             - email
 *             - password
 *     properties:
 *         name:
 *           type: string
 *           description: Name of new user
 *         email:
 *           type: string
 *           format: email
 *           description: Email of new user, must be unique through database
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *   userRegisterResponse:
 *     type: object
 *     properties:
 *         _id:
 *           type: string
 *           description: The auto-genereted by database unique id
 *         name:
 *           type: string
 *           description: Name of new user
 *         email:
 *           type: string
 *           description: Email of new user, must be unique through database
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *         subscription: 
 *           type: string,
 *           nullable: true,
 *           description: User email subscription,
 *           format: email,
 *         token:
 *           type: string
 *           description: JSON token                            
 *         avatarURL:
 *           type: string
 *           description: Url to user avatar
 *         verificationToken:
 *           type: string
 *           description: Defines wether the user confirmed email
 *         favorites:
 *           type: array
 *           items: {}
 *           description: Array of favorite recipes
 *         shoppingList:
 *           type: array
 *           items: {}
 *           description: Array of users shopping list
 * 
 *   userLogin:
 *     type: object
 *     required:
 *             - email
 *             - password
 *     properties:
 *         email:
 *           type: string
 *           description: Email of new user, must be unique through database
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *
 *   userLoginResponse:
 *     type: object
 *     properties:
 *         currentToken:
 *           type: string
 *           description: JWT token
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         subscription:
 *           type: string
 *           description: User email subscription 
 *         avatar:
 *           type: string
 *           description: User avatar
 */