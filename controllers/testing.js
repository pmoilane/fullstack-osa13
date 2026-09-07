const router = require('express').Router()
const { Blog, User } = require('../models')

router.post('/api/reset', async (req, res) => {
  await Blog.destroy({ truncate: { cascade: true } })
  await User.destroy({ truncate: { cascade: true } })

  res.status(204).end()
})

router.get('/', async (req, res) => {
  res.status(200).end()
})

module.exports = router
