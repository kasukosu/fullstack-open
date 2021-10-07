const { count } = require("../models/blog");
const User = require('../models/user')


const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.forEach(blog => {
    totalLikes += blog.likes
  });
  return totalLikes;
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(function (prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })


  return favorite;
}

const mostBlogs = (blogs) => {

  let authors = blogs.map(blog => blog.author).filter((value, index, self) => self.indexOf(value) === index)

  const favorite = authors.reduce(function (prev, current) {
    i = 0;
    blogs.forEach(blog => {
      if (blog.author === current) {
        i++;
      }
    })
    let currentAuthor = {
      author: current,
      blogs: i,
    }
    previous = prev.blogs ? prev.blogs : 0;
    return (previous > current.blogs) ? prev : currentAuthor
  })

  return favorite;
}

const mostLikes = (blogs) => {

  let authors = blogs.map(blog => blog.author).filter((value, index, self) => self.indexOf(value) === index)

  const favorite = authors.reduce(function (prev, current) {
    i = 0;
    blogs.forEach(blog => {
      if (blog.author === current) {
        i += blog.likes;
      }
    })
    let currentAuthor = {
      author: current,
      likes: i,
    }
    previous = prev.likes ? prev.likes : 0;
    return (previous > current.likes) ? prev : currentAuthor
  })

  return favorite;
}

const identifierId = (blogs) => {
  return blogs;

}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  identifierId,
  usersInDb,

}