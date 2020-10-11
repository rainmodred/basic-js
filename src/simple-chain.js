const CustomError = require('../extensions/custom-error');

const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain.push(String(value));
    return this;
  },
  removeLink(position) {
    if (!Number.isInteger(position) || !this.chain[position - 1]) {
      this.chain = [];
      throw Error('');
    }

    this.chain.splice(position - 1, 1);

    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let res = '';

    for (let item of this.chain) {
      if (res.length > 0) {
        res += '~~';
      }

      res += `( ${item} )`;
    }
    this.chain = [];
    return res;
  },
};

module.exports = chainMaker;
