const errorMessages = {
  // When a token has expired or is invalid
  UNAUTHENTICATED: "Please login",

  // When account with a given credential isn't found
  ACCOUNT_NOT_FOUND: "Account not found",

  // When a user types an incorrect password
  WRONG_PASSWORD: "Incorrect password",

  // When a user tries to sign up with an already registered email.
  EMAIL_TAKEN: "That email is already registered",

  // When there's an internal server error
  INTERNAL_SERVER_ERROR: "We are experiencing an internal server error",

  // When refresh token has expired
  INVALID_REFRESH_TOKEN: "The session has expired",

  // When passwords don't match
  PASSWORDS_DONT_MATCH: "Your passwords do not match",

  // When a user has not verified the phone
  PHONE_VERIFICATION_REQUIRED: "Please verify your phone number",

  // Phone number is not valid
  PHONE_NUMBER_IS_NOT_VALID: "Phone number is not valid",

  // When a user doesn't have access privileges
  USER_DOES_NOT_HAVE_ACCESS_PRIVILEGES: "User does not have access privileges",

  // When a resource isn't found
  RESOURCE_NOT_FOUND: (resource) => `${resource} not found`,

  // When file fails to upload
  FAILED_TO_UPLOAD_FILE: "Failed to upload file",

  // When file type is not supported
  FILE_TYPE_NOT_SUPPORTED: "File type is not supported",

  // When file exceeds limit
  FILE_SIZE_EXCEEDS_LIMIT: (limit) =>
    `File size exceeds maximum limit of ${limit}`,

  // When file is not attached
  ATTACH_FILE: "Please attach a file",
};

module.exports = {
  errorMessages,
};
