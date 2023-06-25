const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      minLength: [5, 'must be atleast 5 chars'],
      required: true
    },
    author: {
      type: String,
      required: true,
      minLength: 3
    },
    url: {
      required: true,
      type: String,
    },
    upvotes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})
  

module.exports = mongoose.model('Blog', blogSchema)