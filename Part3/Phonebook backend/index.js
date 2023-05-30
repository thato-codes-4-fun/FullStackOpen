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


app.listen(3001, ()=> {
    console.log('app is listening on port 3001')
})




