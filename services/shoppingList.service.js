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

export const removeIngredients = async (
  user_id,
  user,
  ingredientId,
  measure
) => {

  const index = user.shoppingList.findIndex((item) => {
    return (
      String(item.ingredientId) === String(ingredientId) &&
      item.measure === measure
    )
  })

  if (index === -1) {
    return index
  }

  const deletedId = user.shoppingList.splice(index, 1)

  const result = await User.findByIdAndUpdate(
    user_id,
    {
      shoppingList: user.shoppingList,
      // $pull: {
      //   shoppingList: ingredientId,
      // },
    },
    { new: true }
  )
    .select('shoppingList')
    .populate({
      path: 'shoppingList.ingredientId',
      ref: 'ingredients',
    })
  return
}

export const displayIngredients = async (_id) => {
  // display only array shoppingList
  const { shoppingList } = await User.findById(_id).populate({
    path: 'shoppingList.ingredientId',
    ref: 'ingredients',
  })
  return shoppingList
}
