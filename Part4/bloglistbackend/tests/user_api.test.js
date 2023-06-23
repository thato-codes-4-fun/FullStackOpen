const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async ()=> {
    await UserModel.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new UserModel({
        name: 'Thato Boss the ',
        username: 'Tito',
        passwordhash: passwordHash
    }, 15000)
    await user.save()
})

describe('testing users, 1 user in db already', ()=> {


    test('creating a new user', async ()=> {
        const user = {
            username: 'flying dutch man',
            name: 'max',
            password: 'f1champion'
        }

        await api
        .post('/api/users')
        .send(user)     
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 10000)
})

afterAll(async ()=> {
    await mongoose.connection.close()
})

