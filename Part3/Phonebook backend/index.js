const express = require('express')
const app = express()

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
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res)=> {
    res.send('Hello world')
})

app.get('/api/persons', (req, res)=> {
    res.json(data)
})

app.get('/info', (req, res)=> {
    const phonebookCount = data.length
    const today = new Date().toUTCString()
    const stringData = `Phonebook has info for ${phonebookCount} people <br/><br/> ${today}`
    res.send(stringData)
})

app.get('/api/persons/:id', (req, res)=> {
    console.log('searching...')
    const searchId = Number(req.params.id)
    const person =  data.find(person=> person.id === searchId)
    if (!person){
        return res.status(404).send(`person with id ${searchId} not found`)
    }
    console.log(person)
    return  res.send(person)
})

app.delete('/api/persons/:id', (req, res)=> {
    const searchId = Number(req.params.id)
    const personIndex =  data.findIndex(person=> person.id === searchId)
    console.log(personIndex)
    if (personIndex <= -1){
        return res.status(404).send(`person with id ${searchId} not found`)
    }
    data.splice(personIndex, 1)
    return res.json(data)
})


app.listen(3001, ()=> {
    console.log('app is listening on port 3001')
})





