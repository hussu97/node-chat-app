const path     = require('path'),
      http     = require('http'),
      express  = require('express'),
      socketIO = require('socket.io');

var a =0;

const {generateMessage, generateLocationMessage} = require('./utils/message'),
      {isRealString} = require('./utils/validation'),
      {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  a=a+1;
  console.log(`New user connected: ${a}`);

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }

    socket.join(params.room);
    users.removeUser(socket.room);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //socket.leave(params.room);
    // io.emit -> io.to.(param).emit
    // socket.broadcast.emit -> socket.broadcast.to(params).emit
    // socket.emit

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();

  });

  socket.on('createMessage', (message,callback) => {
    var user = users.getUser(socket.id);
     if (user && isRealString(message.text)) {
       io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
     }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude))
    }
  });

  socket.on('disconnect', () => {
    a=a-1;
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`));
    }
    console.log(`User was disconnected: ${a}`);

  })
});

server.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
