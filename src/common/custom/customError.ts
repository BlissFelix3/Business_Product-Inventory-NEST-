export class CustomError extends Error {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const E_USER_EMAIL_EXISTS = 'Oops! This email is already taken!';
export const E_USER_NOT_FOUND = 'User not found!';
export const E_INCORRECT_EMAIL_OR_PASSWORD =
  'Email or password entered is incorrect!';
export const E_PASSWORD_INCORRECT = 'The password entered is incorrect!';

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
