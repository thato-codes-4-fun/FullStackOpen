const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')



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
    const user = req.user
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
  const blogId = req.params.id
  logger.info('deleting a post', req.params.id)
  const user = req.user
  const blogToDelete = await Blog.findById(blogId)
  if (!blogToDelete){
    return res.status(400).json({error: 'blog not found'})
  }
  if (user._id.toString() === blogToDelete.user.toString()){
    const blog = await Blog.deleteOne({_id: blogId})
    if (blog.deletedCount < 1){
      return res.status(500).json({error: 'no item found'})
    }
    return res.json({success: 'post deleted succesfully'})
  }
  return res.status(400).json({error: "cant delete token not found"})
})


blogRouter.put('/:id', async (req,res)=> {
  const id = req.params.id
  const body = req.body
  let updated = await Blog.findByIdAndUpdate(id, body, {new: true})
  res.json({updated: true, blog: updated})
})

module.exports = blogRouter
