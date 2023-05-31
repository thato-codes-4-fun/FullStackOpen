const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

// Create a custom token for logging the response body as an object
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
  });
  
  // Define the custom logging format
  const logFormat = ':method :url :status :response-time ms :body';
  
  // Log the request and response details using the custom format
  app.use(morgan(logFormat));

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

app.delete('/api/persons/:id', (req, res)=> {
    const searchId = Number(req.params.id)
    const personIndex =  data.findIndex(person=> person.id === searchId)
    console.log(personIndex)
    if (personIndex <= -1){
        return res.status(404).send(`person with id ${searchId} not found`)
    }
    data.splice(personIndex, 1)
    return res.status(204).end()
})

app.post('/api/persons', (req,res)=> {
    let id = getRandomInt()
    const personData = req.body;
    if (!personData.name || personData.name === ''){
        console.log('no name')
        return res.status(404).json('name not provided')
    }
    const presentInData = data.find(person=> person.name.toLowerCase() === personData.name.toLowerCase())
    if (presentInData){
        return res.status(503).json({ error: 'name must be unique' })
    }
    if(!personData.number || personData.number === ''){
        return res.status(404).send('number not provided')
    }
    data.push({...personData, id: id})
    res.send(data)
})


app.listen(3001, ()=> {
    console.log('app is listening on port 3001')
})


function getRandomInt() {
    return Math.floor(Math.random() * 79999);
  }



  const unkownRouteHandler = (req,res, next)=> {
    res.status(404).send('route not found...')
  }
  
  
  app.use(unkownRouteHandler)

