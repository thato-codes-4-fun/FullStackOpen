const blogRouter = require('express').Router()
// const { trusted } = require('mongoose')
const Blog = require('../models/blog')
const User = require(('../models/user'))
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res)=> {
   let response = await Blog.find({}).populate('user')
   res.status(200).json(response)
})

blogRouter.get('/:id', (req, res)=> {
    logger.info(`getting blog with id ${req.params.id}`)
    return res.json({working: 'working'})

})

blogRouter.post('/', async (req,res)=> {
    logger.info('posting new blog...')
    const users = await User.find({})
    const user = users[0]
    console.log("user is ",user)
    const {title, author , url} = req.body
    const blog = new Blog({
      user,
      title,
      url,
      author
    })
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
