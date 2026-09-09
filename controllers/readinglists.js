const router = require('express').Router();
const { ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
  const existingReadingList = await ReadingList.findOne({
    where: { blogId: req.body.blogId, userId: req.body.userId },
  });
  if (existingReadingList != null) {
    return res.status(400).send({ error: 'blog already added for user' });
  }
  const readingListItem = await ReadingList.create(req.body);
  console.log(readingListItem);
  res.json({
    user_id: readingListItem.userId,
    blog_id: readingListItem.blogId,
    id: readingListItem.id,
    read: readingListItem.read,
  });
});

router.put('/:id', tokenExtractor, async (req, res) => {
  req.readingList = await ReadingList.findByPk(req.params.id);
  if (!req.readingList) {
    return res.status(404).json({
      error: `reading list entry with id: ${req.params.id} not found`,
    });
  }

  if (req.readingList.userId.toString() !== req.decodedToken.id.toString()) {
    return res.status(401).json({ error: 'user not authorized' });
  }

  req.readingList.read = req.body.read;
  await req.readingList.save();
  res.json(req.readingList);
});

module.exports = router;
