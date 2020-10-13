const CustomError = require('../extensions/custom-error');

function notSeq(val) {
  if (
    val === '--discard-prev' ||
    val === '--discard-next' ||
    val === '--double-prev' ||
    val === '--double-next'
  ) {
    return false;
  }
  return true;
}

module.exports = function transform(arr) {
  if (!Array.isArray(arr)) throw new Error();

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (notSeq(arr[i]) && arr[i + 1] !== '--discard-prev') {
      if (arr[i + 1] === '--double-prev') {
        result.push(arr[i]);
      }
      result.push(arr[i]);
    }

    if (arr[i] === '--discard-next') {
      if (arr[i + 2] !== '--double-prev' && arr[i + 2] !== '--discard-prev') {
        i += 1;
      } else {
        i += 2;
      }
    }

    if (arr[i] === '--double-next' && notSeq(arr[i + 1]) && i + 1 < arr.length) {
      result.push(arr[i + 1]);
    }
  }
  return result;
};
