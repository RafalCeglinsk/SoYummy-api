import { Schema, model } from 'mongoose'
import Joi from 'joi'

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
})

export const User = model('user', userSchema)

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email format is: example@example.com',
  }),
})
