const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', (req, res, next)=> {
    logger.info('getting all blogs')
    Blog
    .find({})
    .then(blogs => {
      res.status(200).json(blogs)
    })
    .catch(e=> {
        logger.info(e.message)
        next(e.message)
        
    })
})

blogRouter.get('/:id', (req, res)=> {
    logger.info(`getting blog with id ${req.params.id}`)
    return res.json({working: 'working'})

})

blogRouter.post('/', (req,res)=> {
    logger.info('posting new blog...')
    const blog = new Blog(req.body)

    blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
      .catch(e=> {
        logger.error(e.message),
        res.status(404).json({error: e.message})
      })
})




module.exports = blogRouter
