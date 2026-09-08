const router = require('express').Router();
const { ReadingList } = require('../models');

router.post('/', async (req, res) => {
  const readingListItem = await ReadingList.create(req.body);
  res.json(readingListItem);
});

module.exports = router;
