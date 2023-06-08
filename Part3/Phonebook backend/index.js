require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Create a custom token for logging the response body as an object
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});

// Define the custom logging format
const logFormat = ':method :url :status :response-time ms :body';

// Log the request and response details using the custom format
app.use(morgan(logFormat));

const PORT = process.env.PORT || 3001


app.get('/', (req, res) => {
    console.log('loading...')
    res.send('Hello world')
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then( data => res.json(data));
})

app.get('/info', (req, res) => {
    Person.find()
        .then(data => {
            console.log(data.length)
            const phonebookCount = data.length
            const today = new Date().toUTCString()
            const stringData = `Phonebook has info for ${phonebookCount} people <br/><br/> ${today}`
            return res.status(200).send(stringData)
        })
})

app.get('/api/persons/:id', (req, res) => {
    console.log('searching...')
    const searchId = req.params.id
    Person.findById(searchId)
        .then(person => {
            return res.json(person)
        })
        .catch(e => {
            console.log(e.message)
            return res.status(404).send(`cant find person with id ${searchId}`)
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const searchId = req.params.id
    Person.findByIdAndRemove(searchId)
        .then(result => {
            Person.find({})
                .then(people => res.status(204).json(people));
        })
        .catch(e => next(e))
})

app.post('/api/persons', (req,res, next) => {
    const personData = req.body;
    if (!personData.name || personData.name === ''){
        console.log('no name')
        return res.status(404).json('name not provided')
    }
    if(!personData.number || personData.number === ''){
        return res.status(404).send('number not provided')
    }
    const person = new Person({
        name: personData.name,
        number: personData.number
    })
    person.save().then(result => {
        console.log(`person added to db`)
        Person.find({})
            .then(data => res.json(data));
    })
        .catch(e => {
            console.log('Error posting!! ',e.message)
            return next(e)
        })
})

app.put('/api/persons/:id',(req, res) => {
    console.log('we have landed')
    const id = req.params.id
    const body = req.body
    Person.findByIdAndUpdate(id, body, { new: true })
        .then(updatedPerson => {
            return res.json(updatedPerson)
        })
})

app.listen(PORT, ()  => {
    console.log(`app is listening on port ${PORT}`)
})


const errHandler = (err ,req, res, next) => {
    console.error(err.message)
    if(err.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError'){
        return res.status(400).json({ error: err.message })
    }
    res.status(500).send(err.message)
}


const unkownRouteHandler = (req,res, next) => {
    res.status(404).send('route not found...')
}


app.use(unkownRouteHandler)
app.use(errHandler)
