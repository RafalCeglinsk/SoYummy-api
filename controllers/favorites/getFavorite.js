import { getRecipeFavorite } from '../../services/favorite.service.js'

export const getFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user
    const result = await getRecipeFavorite(_id)

    return res.status(200).json({
      code: 200,
      status: `OK`,
      result,
    })
  } catch (error) {
    next(error)
  }
}
