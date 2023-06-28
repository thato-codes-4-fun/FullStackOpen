import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blogs'

const getAll = async(user) => {
  const config = {
    'headers': {Authorization : `Bearer ${user.token}`} 
  }
  const request = await  axios.get(baseUrl, config)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }