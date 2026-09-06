const router = require('express').Router()

const { User, Blog } = require('../models')

router.post('/', async (req, res) => {
  if (req.body.password) {
    delete req.body.password
  }
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId'],
      },
    },
  })
  res.json(users)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  user.name = req.body.name
  await user.save()
  res.json(req.user)
})

module.exports = router
