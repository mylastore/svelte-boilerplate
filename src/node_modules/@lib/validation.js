
export function validateRequired(str) {
  return (!str || 0 === str.length);
}

// // password must be 8 characters or more, must have a capital letter and 1 special character
export function validatePassword(val) {
  return new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{8,50})$"
  ).test(val);
}

export function validateEmail(val) {
  return new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ).test(val);
}
