const router = require('express').Router();
const { ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
  const readingListItem = await ReadingList.create(req.body);
  res.json(readingListItem);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  req.readingList = await ReadingList.findByPk(req.params.id);
  if (!req.readingList) {
    return res
      .status(404)
      .json({
        error: `reading list entry with id: ${req.params.id} not found`,
      });
  }

  if (req.readingList.userId.toString() !== req.decodedToken.id.toString()) {
    return res.status(403).json({ error: 'user not authorized' });
  }

  if (req.body.read != true) {
    return res.status(400).json({ error: 'use "read": true to mark as read' });
  }
  req.readingList.read = req.body.read;
  await req.readingList.save();
  res.json(req.readingList);
});

module.exports = router;
