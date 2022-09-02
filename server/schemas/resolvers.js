const { User } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) return null
      return await User.findById(user._id)
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      return await User.create({ username, email, password })
    },
    login: async (parent, { email, password }) => {
      let user = await User.findOne({ email })
      if (await user.isCorrectPassword(password)) {
        return { token: signToken(user), user }
      } else return null
    },
    saveBook: async (parent, { book }, { user }) => {
      return await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      )
    },
    removeBook: async (parent, { bookId }, { user }) => {
      return await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { _id: bookId } } },
        { new: true, runValidators: true }
      )
    },

  }
}

module.exports = resolvers