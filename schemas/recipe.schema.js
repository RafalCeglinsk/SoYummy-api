import { Schema, model, Types } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  area: {
    type: String,
    default: null,
  },
  instructions: {
    type: String,
    reguired: [true, "Provide an instructions"],
  },
  description: {
    type: String,
    require: [true, "Description is required"],
  },
  thumb: {
    type: String,
    required: [true, "Set image"],
  },
  cloudinaryImageName: {
    type: String,
    default: null,
  },
  preview: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    required: [true, "Set time"],
  },
  popularity: {
    type: Number,
    default: null,
  },
  favorites: {
    type: Array,
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
  ingredients: [
    {
      id: {
        type: Types.ObjectId,
        ref: "ingredient",
      },
      measure: {
        type: String,
        required: [true, "Measure is required"],
      },
      _id: false,
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Recipe = model("recipe", recipeSchema);
