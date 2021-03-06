const BCRYPT_SALT_ROUNDS = 10;
const ROLES = {
  ADMIN: "Admin",
  USER: "User"
};
const ERROR_MESSAGES = {
  API_NOT_FOUND: "API not found.",
  EMAIL_ALREADY_TAKEN: "Email already taken.",
  USER_NOT_FOUND: "User not found.",
  INVALID_PASSWORD: "Invalid password.",
  USER_ROLE_NOT_ALLOWED:
    "Current user does not have a role to do this operation.",
  USER_NOT_ALLOWED: "Current user is not allowed to do this operation."
};

module.exports = {
  BCRYPT_SALT_ROUNDS,
  ROLES,
  ERROR_MESSAGES
};
