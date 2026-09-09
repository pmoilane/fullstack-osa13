const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const User = require('../models/user');
const Session = require('../models/session');

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  console.log(error);

  if (error.name === 'SequelizeValidationError') {
    console.log('SequelizeValidationError');
    return res.status(400).send({ error: error.errors.map((e) => e.message) });
  } else if (error.name === 'TypeError') {
    console.log('TypeError');
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'SequelizeDatabaseError') {
    console.log('SequelizeDatabaseError');
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    console.log('SequelizeForeignKeyConstraintError');
    if (error.index.includes('reading_lists_user_id_fkey')) {
      return res
        .status(400)
        .send({ error: 'user with userId does not exist ' });
    } else if (error.index.includes('reading_lists_blog_id_fkey')) {
      return res
        .status(400)
        .send({ error: 'blog with blogId does not exist ' });
    }
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  const user = await User.findByPk(req.decodedToken.id);
  if (user.disabled === true) {
    await Session.destroy({
      where: {
        userId: user.id,
      },
    });
    return res.status(403).end();
  }

  const session = await Session.findOne({
    where: {
      token: authorization.substring(7),
    },
  });

  if (session === null) {
    return res.status(401).send({ error: 'token not valid' });
  }

  next();
};

module.exports = { errorHandler, tokenExtractor };
