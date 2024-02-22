import { getPopularRecipes } from '../../services/popularRecipes.service.js'

export const popularRecipes = async (req, res, next) => {
  try {

    let { page = 1, limit = 10 } = req.query
    limit = +limit > 50 ? 50 : +limit
    
    const recipes = await getPopularRecipes(page, limit)

    return res.status(200).json({
      code: 200,
      status: `OK`,
      recipes,
    })
  } catch (error) {
    next(error)
  }
}