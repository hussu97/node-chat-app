const path     = require('path'),
      http     = require('http'),
      express  = require('express'),
      socketIO = require('socket.io');

var a =0;

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  a=a+1;
  console.log(`New user connected: ${a}`);

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage', (message,callback) => {
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude))
  });

  socket.on('disconnect', () => {
    a=a-1;
    console.log(`User was disconnected: ${a}`);

  })
});

server.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
