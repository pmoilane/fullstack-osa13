const User = require('./user')
const Blog = require('./blog')

User.hasMany(Blog)
Blog.belongsTo(User)

const syncDb = async () => {
  await User.sync({ alter: true })
  await Blog.sync({ alter: true })
}

syncDb()

module.exports = {
  User,
  Blog,
}
