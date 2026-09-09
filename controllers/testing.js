const router = require('express').Router();
const { Blog, User, ReadingList } = require('../models');
const Session = require('../models/session');

router.post('/api/reset', async (req, res) => {
  await ReadingList.destroy({ truncate: { cascade: true } });
  await Session.destroy({ truncate: { cascade: true } });
  await Blog.destroy({ truncate: { cascade: true } });
  await User.destroy({ truncate: { cascade: true } });

  res.status(204).end();
});

router.get('/', async (req, res) => {
  res.status(200).end();
});

module.exports = router;
