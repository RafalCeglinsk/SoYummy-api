import { registerSchema } from '../../schemas/user.schema.js'
import { registerUser } from '../../services/auth.service.js'

export const register = async (req, res, next) => {
  // validate the request body first
  const validationResult = registerSchema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({
      status: 400,
      ResponseBody: validationResult.error.details[0].message,
    })
  }

  try {
    // registers a new user in the database
    const newUser = await registerUser(req.body)

    // if user exists return error with status conflict
    if (newUser.message) {
      return res.status(409).json({
        status: `CONFLICT`,
        ResponseBody: {
          newUser,
        },
      })
    }

    // if no error return with status created
    return res.status(201).json({
      status: `CREATED`,
      ResponseBody: {
        newUser,
      },
    })
  } catch (error) {
    next(error)
  }
}
