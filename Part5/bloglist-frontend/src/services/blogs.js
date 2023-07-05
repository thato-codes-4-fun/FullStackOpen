import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blogs'

const getAll = async(user) => {
  const config = {
    'headers': {Authorization : `Bearer ${user.token}`} 
  }
  const request = await  axios.get(baseUrl, config)
  return request.data
}

const createBlog = async(user, blogObject)=> {
  console.log('creating a blog')
  const config = {
    'headers': {Authorization: `Bearer ${user.token}`}
  }
  const request = await axios.post(baseUrl,blogObject, config)
  return request.data
}

const updateLikes = async (user , blogObject)=> {
  console.log('updating likes')
  const config = {
    'headers': {Authorization: `Bearer ${user.token}`}
  }
  const blogID = blogObject.id
  const newBlog = {
      "id":  blogID,
      "author": blogObject.author,
      "url": blogObject.url,
      "title": blogObject.title,
      "upvotes": blogObject.upvotes+=1
  }
  const response = await axios.put(baseUrl+'/'+blogID, newBlog,config)
  return response.data.blog
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog , updateLikes}