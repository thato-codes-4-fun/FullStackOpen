import axios from "axios";

let baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addToPhoneBook = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const deleteUrl = baseUrl + '/' + id
    console.log(deleteUrl)
    const request = axios.delete(deleteUrl)
    console.log('response, ', request)
    return request.then(res=> res.data)
}

const updateNumber = (id,updatedObj) => {
    console.log('number updating...')
    const updateUrl = baseUrl + '/' + id
    const request = axios.put(updateUrl, updatedObj)
    return request.then(res => res.data)
}




export default {getAll, addToPhoneBook, deletePerson, updateNumber}

