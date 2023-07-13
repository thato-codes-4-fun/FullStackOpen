import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async(user) => {
    const config = {
        'headers': { Authorization : `Bearer ${ user.token }` }
    }
    const request = await  axios.get(baseUrl, config)
    return request.data
}

const createBlog = async(user, blogObject) => {
    console.log('creating a blog')
    const config = {
        'headers': { Authorization: `Bearer ${ user.token }` }
    }
    const request = await axios.post(baseUrl,blogObject, config)
    return request.data
}

const updateLikes = async (user , blogObject) => {
    console.log('updating likes')
    const config = {
        'headers': { Authorization: `Bearer ${ user.token }` }
    }
    const blogID = blogObject.id
    const newBlog = {
        'id':  blogID,
        'author': blogObject.author,
        'url': blogObject.url,
        'title': blogObject.title,
        'upvotes': blogObject.upvotes+=1
    }
    const response = await axios.put(baseUrl+'/'+blogID, newBlog,config)
    return response.data.blog
}

const deleteBlog = async (user, blogID) => {
    console.log('deleting blog...', blogID)
    const config = {
        headers: { Authorization: `Bearer ${ user.token }` }
    }
    const response = await axios.delete(baseUrl+'/'+blogID, config)
    console.log(response.data)
    return response.data
}


export default { getAll, createBlog , updateLikes, deleteBlog }