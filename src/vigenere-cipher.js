const CustomError = require('../extensions/custom-error');

class VigenereCipheringMachine {
  constructor(direct = true) {
    this.letters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    this.direct = direct;
  }

  _generateKeyword(message, key) {
    let length = message.split(' ').join('').length;
    let keyword = '';

    let i = 0;
    while (keyword.length < length) {
      keyword += key[i];
      i++;
      if (i === key.length) {
        i = 0;
      }
    }
    return keyword;
  }

  _doCrypt(message, key, isEncrypt) {
    let keyword = this._generateKeyword(message, key).toLowerCase();
    let index = 0;
    let cryptedMessage = message
      .split(' ')
      .map((word) =>
        word
          .split('')
          .map((letter) => {
            if (
              letter.charCodeAt(0) < 65 ||
              (letter.charCodeAt(0) > 90 && letter.charCodeAt(0) < 97) ||
              letter.charCodeAt(0) > 122
            ) {
              return letter;
            }

            let messageLetterIndex = this.letters.indexOf(letter.toLowerCase());
            let keywordLetterIndex = this.letters.indexOf(keyword[index]);
            index++;

            if (isEncrypt) {
              return this.letters[
                (messageLetterIndex + keywordLetterIndex) % this.letters.length
              ].toUpperCase();
            }
            return this.letters[
              (messageLetterIndex - keywordLetterIndex + this.letters.length) %
                this.letters.length
            ].toUpperCase();
          })
          .join('')
      )
      .join(' ');

    if (!this.direct) {
      return cryptedMessage.split('').reverse().join('');
    }

    return cryptedMessage;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('');
    }

    return this._doCrypt(message, key, true);
  }
  
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('');
    }

    return this._doCrypt(encryptedMessage, key, false);
  }
}

module.exports = VigenereCipheringMachine;
