const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB

mongoose.connect(mongoUrl)
.then(result=> {
    logger.info('connected to mongodb...')
})
.catch((err=> logger.error('failed to connect to mongodb! ', err.message)))

app.get('/', (req,res)=> {
    logger.info('route: /')
    res.send('Hello World')
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app