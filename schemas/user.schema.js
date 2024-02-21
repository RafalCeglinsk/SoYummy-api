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
          ref: 'recipes',
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
