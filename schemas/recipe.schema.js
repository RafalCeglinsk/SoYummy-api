import { Schema, Types, model } from 'mongoose'

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
    required: [true, 'Set image'],
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
  favorites: {
    type: Types.ObjectId,
    ref: 'user',
    default: null,
  },
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
