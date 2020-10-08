export class AppError extends Error {}

export class ActionParamError extends AppError {
  message = 'Invalid action.';
}

export class ShiftParamError extends AppError {
  message = 'Invalid shift value.';
}

export class ShiftRangeError extends AppError {
  message = 'Shift is out of range.';
}

export class InputParamError extends AppError {
  message = 'Cannot read input file.';
}

export class OutputParamError extends AppError {
  message = 'Cannot write to output file.';
}
