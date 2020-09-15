const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (!Array.isArray(members)) return false;

  return members
    .filter((item) => typeof item === 'string')
    .map((member) => member.trim().toUpperCase().charAt(0))
    .sort()
    .join('');
};
