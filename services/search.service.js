import { Recipe } from '../schemas/recipe.schema.js'

export const getTitleSearch = async (title) => {
  const searchTitle = await Recipe.find({
    title: { $regex: new RegExp(`^${title}`, 'i') },
  })

  return searchTitle
}
