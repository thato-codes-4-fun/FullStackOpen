const blogRouter = require('express').Router()
// const { trusted } = require('mongoose')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res)=> {
   let response = await Blog.find({})
   res.status(200).json(response)
})

blogRouter.get('/:id', (req, res)=> {
    logger.info(`getting blog with id ${req.params.id}`)
    return res.json({working: 'working'})

})

blogRouter.post('/', async (req,res)=> {
    logger.info('posting new blog...')
    const blog = new Blog(req.body)
    let saved = await blog.save()
    res.status(201).json(saved)
})

blogRouter.delete('/:id', async (req,res)=> {
  const id = req.params.id
  logger.info('deleting a post', req.params.id)
  const blog = await Blog.deleteOne({_id: id})
  if (blog.deletedCount < 1){
    return res.status(500).json({error: 'no item found'})
  }
  res.json({success: 'post deleted'})
})

blogRouter.put('/:id', async (req,res)=> {
  const id = req.params.id
  const body = req.body
  let updated = await Blog.findByIdAndUpdate(id, body, {new: true})
  res.json({updated: true, blog: updated})
})

module.exports = blogRouter
