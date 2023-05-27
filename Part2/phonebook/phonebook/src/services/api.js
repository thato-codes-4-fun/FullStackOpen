import axios from "axios";

let baseUrl = 'http://localhost:3001/persons'

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
    return request.then(res=> res.data)
}




export default {getAll, addToPhoneBook, deletePerson}

