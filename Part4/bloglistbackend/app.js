const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

const blogRouter = require('./controller/blog')

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


logger.info('connecting to mongodb...')
const mongoUrl = config.MONGODB

mongoose.connect(mongoUrl)
.then(result=> {
    logger.info('connected to mongodb...')
})
.catch((err=> logger.error('failed to connect to mongodb! ', err.message)))



module.exports = app