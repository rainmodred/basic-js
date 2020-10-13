const CustomError = require('../extensions/custom-error');

function repeatStr(str, separator, repeatTimes) {
  return (str + separator).repeat(repeatTimes).slice(0, -separator.length);
}

module.exports = function repeater(str, options) {
  const {
    repeatTimes,
    separator = '+',
    addition,
    additionRepeatTimes,
    additionSeparator = '|',
  } = options;

  let add = addition === undefined ? '' : String(addition);
  if (additionRepeatTimes > 1) {
    add = repeatStr(add, additionSeparator, additionRepeatTimes);
  }

  let res = add.length > 0 ? String(str) + add : String(str);
  if (repeatTimes > 1) {
    res = repeatStr(res, separator, repeatTimes);
  }

  return res;
};
