const router = require('express').Router();

const User = require('../models/user');
const Session = require('../models/session');
const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.decodedToken.id,
    },
  });
  res.status(204).send('logged out');
});

module.exports = router;
