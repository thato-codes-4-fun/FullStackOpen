const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res, next)=> {
   let response = await Blog.find({})
   res.status(200).json(response)
})

blogRouter.get('/:id', (req, res)=> {
    logger.info(`getting blog with id ${req.params.id}`)
    return res.json({working: 'working'})

})

blogRouter.post('/', async (req,res, next)=> {
    logger.info('posting new blog...')
    const blog = new Blog(req.body)
    let saved = await blog.save()
    res.status(201).json(saved)
})




module.exports = blogRouter
