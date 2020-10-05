class AppError extends Error {}

class ActionParamError extends AppError {
  message = 'Invalid action.';
}

class ShiftParamError extends AppError {
  message = 'Invalid shift value.';
}

class ShiftRangeError extends AppError {
  message = 'Shift is out of range.';
}

class InputParamError extends AppError {
  message = 'Cannot read input file.';
}

class OutputParamError extends AppError {
  message = 'Cannot write to output file.';
}

module.exports = {
  AppError,
  ActionParamError,
  ShiftParamError,
  InputParamError,
  OutputParamError,
  ShiftRangeError,
};
