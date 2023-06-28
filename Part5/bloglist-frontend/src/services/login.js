import axios from "axios";
const baseUrl = 'http://localhost:3002/api/login'

const login = async (credentials)=> {
    console.log('loggin in')
    let response = await axios.post(baseUrl, credentials)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }