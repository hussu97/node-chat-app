var expect = require('chai').expect

var {generateMessage} = require('./message')

describe('generateMessage',() => {
    it('should generate correct message object', () => {
      var from = 'Hussu';
      var text = 'Some message';
      // store res in variable
      var message = generateMessage(from,text);

      // assert createAt is number
      expect(message.createAt).to.be.a('number');
      // assert from match
      // assert text match
      expect(message).include({from,text});
    });
});
