const logger = require('../utils/logger')

const requestLogger = (request, response, next)=> {
      console.log('logger')
      logger.info('Method:', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
      next()
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).json({ error: 'unknown endpoint' })
  }

  const errorHandler = (error, request, response, next) => {
    logger.error('we are in error handler')
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: error.message })
    }
    else if (error.name === "TokenExpiredError") {
      return response.status(400).json({error: "Token Expired"})
    }
    next(error)
  }

const extractToken = (req, res, next)=> {
  console.log('somehow extract token')
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')){
    req.token = auth.replace("Bearer ", '')
  }
  next()
}
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    extractToken
  }

