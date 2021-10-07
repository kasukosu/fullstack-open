const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Title 2',
    author: 'Kasper Koskenvirta',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('When has initial notes ', () => {


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('list always has identifier id', async () => {
    let response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

describe('addition of a new notes', () => {

  test('a valid note can be added ', async () => {
    const newBlog =
      {
        title: 'New added title',
        author: 'Carolina',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 9,
      }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')


    expect(response.body).toHaveLength(initialBlogs.length + 1)

  })

  test('a note can be added with no likes ', async () => {
    const newBlog =
      {
        title: 'New added title no likes',
        author: 'Carolina',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')


    expect(response.body[2].likes).toEqual(0)


  })

  test('a note without title and url ', async () => {
    const newBlog =
      {
        title: '',
        author: 'no title no url',
        url: '',
        likes: 5,
      }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})


afterAll(() => {
  mongoose.connection.close()
})