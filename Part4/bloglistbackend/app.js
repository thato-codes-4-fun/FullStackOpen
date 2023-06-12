const express = require('express')
const app = express()
const cors = require('cors')

const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())
const blogRouter = require('./controller/blog')
app.use('/api/blogs', blogRouter)



const mongoUrl = config.MONGODB

mongoose.connect(mongoUrl)
.then(result=> {
    logger.info('connected to mongodb...')
})
.catch((err=> logger.error('failed to connect to mongodb! ', err.message)))



module.exports = app