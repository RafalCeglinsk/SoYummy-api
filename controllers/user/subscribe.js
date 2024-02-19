import { ApiError } from '../../utils/errors/ApiError.js'
import { subscribeSchema } from '../../schemas/user.schema.js'
import { checkSubscriptionStatus } from '../../services/user.service.js'
import { updateUserProfile } from '../../services/user.service.js'

export const subscribe = async (req, res, next) => {
  try {
    // validate the request body first
    const validationResult = subscribeSchema.validate(req.body)
    if (validationResult.error) {
      return next(ApiError.conflict(validationResult.error.details[0].message))
    }

    const { id } = req.user
    const { email } = req.body

    if (email !== req.user.email) {
      return next(
        ApiError.conflict(
          `The email address entered: ${email} does not match yours. Please enter your email: ${req.user.email}`
        )
      )
    }

    const { userProfile } = await checkSubscriptionStatus(id, email)

    const isSubscribed = userProfile?.subscription === email

    if (isSubscribed) {
      return next(
        ApiError.conflict('You are already subscribed to the newsletter')
      )
    }
    
    const updatedUser = await updateUserProfile(id, {
      subscription: email,
    })

    res.status(200).json({
      code: 200,
      status: `OK`,
      ResponseBody: {
        subscription: updatedUser.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}
