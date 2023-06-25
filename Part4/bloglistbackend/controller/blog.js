const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (req, res)=> {
   let response = await Blog.find({}).populate('user', {blogs: 0})
   res.status(200).json(response)
})

blogRouter.get('/:id', (req, res)=> {
    logger.info(`getting blog with id ${req.params.id}`)
    return res.json({working: 'working'})

})

blogRouter.post('/', async (req,res)=> {
    logger.info('posting new blog...')
    
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!decodedToken.id){
      return res.status(401).json({ error: 'token invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    const {title, author , url} = req.body
    const blog = new Blog({
      title,
      url,
      author,
      user: user.id

    })
    let saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
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
