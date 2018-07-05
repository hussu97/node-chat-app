const expect = require('chai').expect;
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(98);
      expect(res).to.equal(false);
  });
  it('should reject string with spaces', () => {
    var res = isRealString('    ');
    expect(res).to.equal(false);
  });
  it('should allow string with non-space characters', () => {
    var res = isRealString('  ssdd  ');
    expect(res).to.equal(true);
  });
});
