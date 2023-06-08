require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

console.log('connecting to mongodb...')

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongodb...')
    })
    .catch(err => console.log('Error conecting to mongo: ', err.message))


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'must be at least 3 chars'],
        required: true,
    },
    number: {
        type: String,
        minLength: [8, 'number should be 8 chars or more'],
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
})


personSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})


const Person = mongoose.model('Person', personSchema)

module.exports = Person
