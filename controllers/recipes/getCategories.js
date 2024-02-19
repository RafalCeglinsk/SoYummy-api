import { sortCategory } from '../../services/recipes.service.js'

const CATEGORY_LIST = [
  'Pork',
  'Breakfast',
  'Dessert',
  'Vegetarian',
  'Side',
  'Goat',
  'Lamb',
  'Pasta',
  'Chicken',
  'Seafood',
  'Starter',
  'Vegan',
  'Miscellaneous',
  'Beef',
]

export const getCategories = async (_, res, next) => {
  try {
    const sortedCategory = sortCategory(CATEGORY_LIST)

    return res.status(200).json({
      code: 200,
      status: `OK`,
      categories: sortedCategory,
    })
    
  } catch (error) {
    next(error)
  }
}
