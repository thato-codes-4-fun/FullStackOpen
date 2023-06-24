const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach( async()=> {
    console.log('delet user')
    await UserModel.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new UserModel({
        name: 'Thato',
        username: 'Tito',
        passwordhash: passwordHash
    })
    await user.save()
},15000)

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
    }, 15000)
})

describe('Testing Users in DB', ()=> {
    test('can get users', async ()=> {
        const res = await api.get('/api/users')
        expect(res.body).toHaveLength(1)
    },10000)
})


describe('test user creation', ()=> {
    test('error when user enters less 3 chars for username',async ()=> {
        const res = await api.post('/api/users/').send({
            username: 'th',
            password: 'hello',
            name: 'Thato'
        })
        expect(res.body.error).toEqual('User validation failed: username: username should be 3 chars long')
    }, 15000)

    test('error when user enters less 3 chars for password',async ()=> {
        const res = await api.post('/api/users/').send({
            username: 'tito',
            password: 'he',
            name: 'Thato'
        })
        expect(res.body.error).toEqual('password validation failed: password: password should be 3 chars long')
    }, 15000)

    test('error when user omits username',async ()=> {
        const res = await api.post('/api/users/').send({
            password: 'hello',
            name: 'Thato'
        })
        expect(res.body.error).toEqual('User validation failed: username: Path `username` is required.')
    }, 15000)

    test('error when user omits password',async ()=> {
        const res = await api.post('/api/users/').send({
            username: 'King bru',
            name: 'Thato'
        })
        expect(res.body.error).toEqual('password validation failed: password: password should be 3 chars long')
    }, 15000)

    test('error when username already exists', async()=> {
        const res = await api.post('/api/users').send({
            username: 'Tito',
            name: 'Thato',
            password: 'password',
        })
        expect(res.body.error).toEqual('User validation failed: username: Error, expected `username` to be unique. Value: `Tito`')
    })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})

