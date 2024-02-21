import { User } from '../schemas/user.schema.js'

export const addIngredients = async (user, data) => {
  const { ingredientId, measure, recipeId } = data

  const result = await User.findByIdAndUpdate(
    user,
    {
      $push: { shoppingList: { ingredientId, recipeId, measure } },
    },
    { new: true }
  )
    .select('shoppingList')
    .populate({ path: 'shoppingList.ingredientId', ref: 'ingredients' })

  return result
}

export const removeIngredients = async () => {}

export const displayIngredients = async (_id) => {
  // display only array shoppingList
  const { shoppingList } = await User.findById(_id).populate({
    path: 'shoppingList.ingredientId',
    ref: 'ingredients',
  })
  return shoppingList
}
