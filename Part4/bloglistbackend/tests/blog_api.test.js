const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


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

describe('testing blog get methods', ()=> {
    test('blogs returned as json', async ()=> {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    }, 15000)

    test('2 blogs found in test db', async ()=> {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length)
    }, 15000)


test('content of first item equal to test2', async()=> {
    const res = await api.get('/api/blogs')
    const content = res.body.map(item => item.title)
    expect(content).toContain('cool beans')
}, 10000)


test('item in db contains an id', async()=> {
    const res = await api.get('/api/blogs')
    let blog = res.body[0]
    expect(blog.id).toBeDefined()
    blog = res.body[1]
    expect(blog.id).toBeDefined()
})

})


describe('blog posts tests', ()=> {
    test('check we can make a succesfull post', async ()=> {
        await api.post('/api/blogs').send({
            "title": "test3",
            "author": "hello tests",
            "url": "test url 1"
        })
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length+1)
        expect(res.body[2].id).toBeDefined()
        const content = res.body.map(item => item.title)
        expect(content).toContain('test3')
    })
    
    test('check that when i post default likes equal 0', async ()=> {
        await api.post('/api/blogs').send({
            "title": "test4",
            "author": "max verstappen",
            "url": "test url 1"
        })
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length+1)
        const content = res.body.map(item => item.title)
        expect(content).toContain('test4')
        expect(res.body[2].upvotes).toBeDefined()
        expect(res.body[2].upvotes).toEqual(0)
        
    })
})



describe('bad blog post missing data', ()=> {

    test('bad blog post missing url', async ()=> {
        let res = await api.post('/api/blogs').send({
            "title": "test4",
            "author": "max verstappen",
            // "url": "test url 1"
        })
        expect(res.body.error).toBeDefined()
        expect(res.body.error).toEqual('Blog validation failed: url: Path `url` is required.')
        expect(res.status).toEqual(400)
    })
    

    test('bad blog post missing title', async ()=> {
        let res = await api.post('/api/blogs').send({
            // "title": "test4",
            "author": "max verstappen",
            "url": "test url 1"
        })
        expect(res.body.error).toBeDefined()
        expect(res.body.error).toEqual('Blog validation failed: title: Path `title` is required.')
        expect(res.status).toEqual(400)
    })
    
    test('bad blog post missing author', async ()=> {
        let res = await api.post('/api/blogs').send({
            "title": "test4",
            // "author": "max verstappen",
            "url": "test url 1"
        })
        expect(res.body.error).toBeDefined()
        expect(res.body.error).toEqual('Blog validation failed: author: Path `author` is required.')
        expect(res.status).toEqual(400)
    })

})

describe('deleting a blog plost', ()=> {
    
})



afterAll(async ()=> {
    await mongoose.connection.close()
})










