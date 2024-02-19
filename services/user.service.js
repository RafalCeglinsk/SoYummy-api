import { User } from '../schemas/user.schema.js'

export const updateUserProfile = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    // https://mongoosejs.com/docs/validation.html#update-validators
    runValidators: true,
  })
  return user
}

export const checkSubscriptionStatus = async (id, email) => {
  const [userProfile, userSubscribedEmail] = await Promise.all([
    User.findById(id),
    User.findOne({ subscription: email }),
  ])

  return { userProfile, userSubscribedEmail }
}
