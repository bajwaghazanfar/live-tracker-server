const validatePassword = (password, length) => {
  if (password.length > length) {
    return {
      error: null,
    };
  }
  return {
    error: `Password must be greater than ${length} charachters`,
  };
};
module.exports = validatePassword;
