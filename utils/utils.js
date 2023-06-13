const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;

module.exports.errorHandler = (err, res) => {
  switch (err.constructor) {
    case ValidationError: {
      const errors = Object.values(err.errors).map((error) => error.message);
      res.status(400).send({ message: 'Validation error', errors });
      break;
    }
    case CastError:
      res.status(400).send({ message: 'Ошибка! Переданы некорректные данные' });
      break;
    case DocumentNotFoundError:
      res.status(404).send({ message: 'Ошибка! Данные не найдены' });
      break;
    default:
      res.status(500).send({ message: 'Internal Server Error' });
  }
};
