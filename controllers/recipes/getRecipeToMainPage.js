import { mainPage } from '../../services/recipes.service.js'

export const getRecipeToMainPage = async (req, res) => {
  try {

    const recipesMainPage = await mainPage()

    return res.status(200).json({
      code: 200,
      status: `OK`,
      recipesMainPage,
    })

  } catch (error) {
    next(error)
  }
}
