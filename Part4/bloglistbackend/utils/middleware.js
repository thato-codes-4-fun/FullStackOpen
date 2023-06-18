const logger = require('../utils/logger')

const requestLogger = (request, response, next)=> {
    if (process.env.NODE_ENV !== 'test'){
      console.log('logger')
      logger.info('Method:', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
      next()
    }
    next()
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).json({ error: 'unknown endpoint' })

  }


  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
  }

