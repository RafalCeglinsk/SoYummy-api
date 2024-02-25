import { Schema, Types, model } from 'mongoose'
import Joi from 'joi'
import objectId from 'joi-objectid'
Joi.objectId = objectId(Joi)

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Set title'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  area: {
    type: String,
    default: null,
  },
  instructions: {
    type: String,
    reguired: [true, 'Provide an instructions'],
  },
  description: {
    type: String,
    require: [true, 'Description is required'],
  },
  thumb: {
    type: String,
    default: null,
  },
  preview: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    required: [true, 'Set time'],
  },
  popularity: {
    type: Number,
    default: null,
  },
  favorites: [
    {
      type: Types.ObjectId,
      ref: 'user',
      default: null,
    },
  ],
  likes: {
    type: Array,
    default: null,
  },
  youtube: {
    type: String,
    default: null,
  },
  tags: {
    type: Array,
    default: null,
  },
  ingredients: {
    type: Array,
    required: true,
    ref: 'ingredient',
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
  },
})

export const Recipe = model('recipe', recipeSchema)

export const favoriteSchema = Joi.object({
  recipeId: Joi.objectId().required(),
})

export const ownRecipesSchema = Joi.object({
  preview: Joi.string(),
  thumb: Joi.string(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  ingredients: Joi.array().required(),
  instructions: Joi.string().required(),
})

/**
 * @openapi
 * components:
 *   schemas:
 *     Popular:
 *       type: object
 *       required:
 *         - title
 *         - instructions
 *       properties:
 *         title:
 *           type: string
 *           example: Spaghetti Bolognese
 *         category:
 *           type: string
 *           example: Beef
 *         instructions:
 *           type: array
 *         description:
 *             type: string
 *         thumb:
 *            type: string
 *         favorites:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/userRegisterResponse"
 *             example: [{"user1"}, {"user2"}]
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - instructions
 *       properties:
 *         id:
 *           type: string
 *           example: 640cd5ac2d9fecf12e8898b1
 *         title:
 *           type: string
 *           example: Home-made Mandazi
 *         category:
 *           type: string
 *           example: Breakfast
 *         area:
 *           type: string
 *           example: Kenyan
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *         thumb:
 *           type: string
 *         preview:
 *           type: string
 *         time:
 *           type: string
 *           example: 55
 *         favorites: 
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/userRegisterResponse"
 *           example: [{"user1"}, {"user2"}]
 *         youtube:
 *           type: string
 *           example: https://www.youtube.com/watch?v=e52IL8zYmaE
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Breakfast", "Baking"]
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *
 *     Ingredient:
 *       required:
 *         - name
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Chicken
 *         desc:
 *           type: string
 *         img:
 *           type: string
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 640cd5ac2d9fecf12e8898b1
 *         title:
 *           type: string
 *           example: Home-made Mandazi
 *         category:
 *           type: string
 *           example: Breakfast
 *         description:
 *           type: string
 *         thumb:
 *           type: string
 *         preview:
 *           type: string
 */