const validateEmail = (email) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return {
      error: null,
    };
  } else {
    return {
      error: "Invalid Email",
    };
  }
};
module.exports = validateEmail;
