const checkStatus = (func1, func2) => {
  if (func1.error === null && func2.error === null) {
    return true;
  }

  return false;
};
module.exports = checkStatus;
