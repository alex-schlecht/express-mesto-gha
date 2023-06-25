const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Duplicated = require('../errors/Duplicated');

module.exports.errorHandler = (err, res, next) => {
  switch (err.constructor) {
    case ValidationError: {
      const errors = Object.values(err.errors).map((error) => error.message);
      next(new BadRequest(`Validation error ${errors}`));
      break;
    }
    case Duplicated:
      next(new Duplicated(err.message));
      break;
    case CastError:
      next(new BadRequest(err.message));
      break;
    case DocumentNotFoundError:
      next(new NotFound(err.message));
      break;
    default:
      next(new NotFound(err.message));
  }
};
