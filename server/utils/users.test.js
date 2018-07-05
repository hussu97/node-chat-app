const expect = require('chai').expect;

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:'123',
      name:'A',
      room:'FU'
    }, {
      id:'456',
      name:'B',
      room:'UF'
    }, {
      id:'789',
      name:'C',
      room:'FU'
    }]
  })
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id:'123',
      name:'wowoww',
      room:'FU'
    };
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).to.deep.equal([user]);
  });

  it('should return names for course', () => {
    var userList = users.getUserList('FU');
    expect(userList).to.deep.equal(['A','C'])
  });

  it('should remove a user', () => {
    var userId = '123';
    var user = users.removeUser(userId);

    expect(user.id).to.equal(userId);
  });

  it('should not remove a user', () => {
    var userId = '12333';
    var user = users.removeUser(userId);

    expect(user).to.not.exist;
  });

  it('should find user', () => {
    var userId = '123';
    var user = users.getUser(userId);

    expect(user.id).to.equal(userId);
  });

  it('should not find user', () => {
    var userId = '12333';
    var user = users.getUser(userId);

    expect(user).to.not.exist;
  });
});
