import { Recipe } from '../schemas/recipe.schema.js'
import { Types } from 'mongoose'

export const sortCategory = (data) => {
  return data.sort()
}

export const getRecipeId = async (recipeId) => {
  const recipe = await Recipe.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(recipeId),
      },
    },
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredients.id',
        foreignField: '_id',
        as: 'ingredients_details',
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: '$ingredients',
            in: {
              $mergeObjects: [
                '$this',
                {
                  $arrayElemAt: [
                    '$ingredients_details',
                    {
                      $indexOfArray: ['$ingredients_details._id', '$this.id'],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      //removes the top-level fields ingredients_details and ingredients.id
      $unset: ['ingredients_details', 'ingredients.id'],
    },
  ])

  return recipe[0]
}

export const mainPage = async () => {
  const limitRecipe = 4

  const breakfast = await Recipe.find({ category: 'Breakfast' }).limit(
    limitRecipe
  )
  const miscellaneous = await Recipe.find({
    category: 'Miscellaneous',
  }).limit(limitRecipe)

  const chicken = await Recipe.find({ category: 'Chicken' }).limit(limitRecipe)
  const dessert = await Recipe.find({ category: 'Dessert' }).limit(limitRecipe)

  return { breakfast, miscellaneous, chicken, dessert }
}
