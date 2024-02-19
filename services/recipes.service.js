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
