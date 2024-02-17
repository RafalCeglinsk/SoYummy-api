import { Schema, model } from "mongoose"

const IndegredientsSchema = new Schema({
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

export const IndegredientsModel = model("Indegredient", IndegredientsSchema)
