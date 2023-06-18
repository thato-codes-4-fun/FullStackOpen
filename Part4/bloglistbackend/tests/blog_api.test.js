const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
// mongoose.set("bufferTimeoutMS", 30000)

const initialBlogs = [
    {
        title: 'cool beans',
        author: 'thato',
        url: 'www.thato.com'
    },
    {
        title: 'f1 is awesome',
        author: 'max',
        url: 'www.thato.com'
    },
]

beforeEach( async()=> {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
}, 15000)



test('blogs returned as json', async ()=> {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
}, 10000)



test('2 blogs found in test db', async ()=> {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
}, 10000)


test('content of first item equal to test2', async()=> {
    const res = await api.get('/api/blogs')
    const content = res.body.map(item => item.title)
    expect(content).toContain('cool beans')
}, 10000)

afterAll(async ()=> {
    await mongoose.connection.close()
})










