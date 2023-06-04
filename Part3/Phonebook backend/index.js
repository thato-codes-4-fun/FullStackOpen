require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
var mongoose = require('mongoose');

// Create a custom token for logging the response body as an object
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
  });
  
  // Define the custom logging format
  const logFormat = ':method :url :status :response-time ms :body';
  
  // Log the request and response details using the custom format
  app.use(morgan(logFormat));

  const PORT = process.env.PORT || 3001

const data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramovsss", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res)=> {
    console.log('loading...')
    res.send('Hello world')
})

app.get('/api/persons', (req, res)=> {
    Person.find({})
    .then(data=> res.json(data));
})

app.get('/info', (req, res)=> {
    const phonebookCount = data.length
    const today = new Date().toUTCString()
    const stringData = `Phonebook has info for ${phonebookCount} people <br/><br/> ${today}`
    res.json(stringData)
})

app.get('/api/persons/:id', (req, res)=> {
    console.log('searching...')
    const searchId = Number(req.params.id)
    const person =  data.find(person=> person.id === searchId)
    if (!person){
        return res.status(404).send(`person with id ${searchId} not found`)
    }
    return  res.json(person)
})

app.delete('/api/persons/:id', (req, res, next)=> {
    const searchId = req.params.id
    Person.findByIdAndRemove(searchId)
    .then(result=> {
        Person.find({})
        .then(people=> res.status(204).json(people));
    })
    .catch(e => next(e))
})

app.post('/api/persons', (req,res)=> {
    const personData = req.body;
    if (!personData.name || personData.name === ''){
        console.log('no name')
        return res.status(404).json('name not provided')
    }
    // const presentInData = data.find(person=> person.name.toLowerCase() === personData.name.toLowerCase())
    // if (presentInData){
    //     return res.status(503).json({ error: 'name must be unique' })
    // }
    if(!personData.number || personData.number === ''){
        return res.status(404).send('number not provided')
    }
    const person = new Person({
        name: personData.name,
        number: personData.number
    })
    person.save().then(result=> {
        console.log(`person added to db`)
        Person.find({})
        .then(data=> res.json(data));
    })

})


app.listen(PORT, ()=> {
    console.log(`app is listening on port ${PORT}`)
})


const errHandler = (err ,req, res, next) => {
    console.log(err.message)
    res.status(500).send(err.message)
}


const unkownRouteHandler = (req,res, next)=> {
    res.status(404).send('route not found...')
  }
  
  
app.use(unkownRouteHandler)
app.use(errHandler)
