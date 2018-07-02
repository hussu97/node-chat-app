var expect = require('chai').expect

var {generateMessage,generateLocationMessage} = require('./message')

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
      expect(message).to.include({from,text});
    });
});

describe('generateLocationMessage',() => {
  it('should generate correct location object', () => {
    var from ='Admin';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';

    var locationMessage = generateLocationMessage(from,latitude,longitude);

    expect(locationMessage.createAt).to.be.a('number');
    expect(locationMessage).to.include({from,url});
  });
});
