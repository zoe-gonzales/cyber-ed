/* eslint-disable no-undef */
// eslint-disable-next-line prefer-destructuring
const assert = require('chai').assert;

describe('Basic Mocha String Test', () => {
  it('should return number of charachters in a string', () => {
    assert.equal('Hello'.length, 5);
  });
  it('should return first charachter of the string', () => {
    assert.equal('Hello'.charAt(0), 'H');
  });
  it('should return sum value', () => {
    assert.equal(2 + 2, 4);
  });
  it('should have a type of string', () => {
    assert.typeOf(4, 'string');
  });
});

// describe('User Model Test', () => {
//   it('should return ')
// });
