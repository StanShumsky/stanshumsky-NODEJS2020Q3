const { AppError } = require('./errors');

const isNumber = (number) => typeof number === 'number' && !isNaN(number) && isFinite(number);

const handleError = (error) => {
  if (error instanceof AppError) {
    console.error('Error:', error.message);
  } else {
    console.error(`Oops, Something Went Wrong...`);
  }
  process.exit(1);
};

module.exports = {
  isNumber,
  handleError,
};
