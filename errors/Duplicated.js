class Duplicated extends Error {
  constructor(message) {
    super(message);
    this.name = 'Duplicated';
    this.statusCode = 11000;
  }
}

module.exports = Duplicated;
