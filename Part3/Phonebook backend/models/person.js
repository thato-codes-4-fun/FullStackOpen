require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

console.log('connecting to mongodb...')

mongoose.connect(url)
.then(result => {
    console.log('connected to mongodb...')
})
.catch(err=> console.log('Error conecting to mongo: ', err.message))


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'must be at least 3 chars'],
        required: true,
    },
    number: String,
})


personSchema.set('toJSON', {
    transform: (doc, returnObj)=> {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})


const Person = mongoose.model('Person', personSchema)

module.exports = Person
