const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'SequelizeValidationError') {
    console.log('SequelizeValidationError');
    return res.status(400).send({ error: error.errors.map((e) => e.message) });
  } else if (error.name === 'TypeError') {
    console.log('TypeError');
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'SequelizeDatabaseError') {
    console.log('SequelizeDatabaseError');
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
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
  next();
};

module.exports = { errorHandler, tokenExtractor };
