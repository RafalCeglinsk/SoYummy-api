import { Schema, model } from "mongoose"

const ingredientSchema = new Schema({
  ttl: {
    type: String,
    required: [true, 'Recipe title is required'],
  },
  desc: {
    type: String,
    require: [true, 'Recipe description is required'],
  },
  t: {
    type: String,
    default: '',
  },
  thb: {
    type: String,
    required: [true, 'Set image'],
  },
})

export const Ingredient = model("ingredient", ingredientSchema)
