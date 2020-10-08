import { AppError } from '../models';

export function handleError(error: AppError | Error) {
  if (error instanceof AppError) {
    console.error('Error:', error.message);
  } else {
    console.error(`Oops, Something Went Wrong...`);
  }
  process.exit(1);
}
