import { ApiError } from '../../utils/errors/ApiError.js'
import { ownRecipesSchema } from '../../schemas/recipe.schema.js'
import { createRecipe } from '../../services/ownRecipes.service.js'
import { Types } from 'mongoose'
import { uploadRecipeImage } from '../../utils/cloudinary.js'
import path from 'path'

export const addRecipe = async (req, res, next) => {
  const validationResult = ownRecipesSchema.validate(req.body)
  if (validationResult.error) {
    return next(ApiError.badRequest(validationResult.error.details[0].message))
  }

  try {
    const { _id } = req.user
    const { title, category, instructions, description, time } = req.body
    let recipeImg = null

    const ingredients = [
      {
        id: '640c2dd963a319ea671e3773', //id produktu z tabeli ingredients
        measure: '500g',
      },
      {
        id: '640c2dd963a319ea671e3735', //id produktu z tabeli ingredients
        measure: '1/2 cup',
      },
    ]

    console.log(JSON.stringify(req.body))
    console.log('req.file.mimetype:' + req.file.mimetype)

    /* 
    Converts the buffer in the parsed file to base64, and further transforms this representation 
    to a data URI, which is then fed to the handleUpload function to upload. Once it succeeds, 
    we send the upload response we get from cloudinary back to the client-side, and if it fails, 
    the error response is sent back.
    */
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    
    // for example ( -- (req.file.mimetype:image/jpeg)
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    if (!req.file) {
      // set default image no preview
      recipeImg =
        'https://res.cloudinary.com/dyomlbrcf/image/upload/v1708692584/yummy-api/recipes/linjixv3vn290nvjmf2v.png'
    } else {
      recipeImg = await uploadRecipeImage(dataURI)
    }

    let parsedIngredients = null

    if (Array.isArray(ingredients)) {
      // This is an array of objects, so there is no need to parse
      parsedIngredients = ingredients
    } else {
      // This is not an array of objects, so parse it as a JSON string
      parsedIngredients = JSON.parse(ingredients)
    }

    const objData = {
      preview: recipeImg.hasOwnProperty('url') ? recipeImg.url : recipeImg,
      thumb: recipeImg.hasOwnProperty('url') ? recipeImg.url : recipeImg,
      title,
      category,
      description,
      time,
      ingredients: parsedIngredients.map((ingredient) => ({
        id: new Types.ObjectId(ingredient.id),
        measure: ingredient.measure,
      })),
      instructions,
      owner: new Types.ObjectId(_id),
    }

    const recipe = await createRecipe(objData)

    return res.status(201).json({
      code: 201,
      status: `CREATED`,
      recipe,
    })
  } catch (error) {
    next(error)
  }
}
