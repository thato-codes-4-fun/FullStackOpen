const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    passwordhash: {
        type: String,
        required: true,
    }
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
        delete returnObj.passwordhash
    }
})

module.exports = mongoose.model('User', userSchema)