const path     = require('path'),
      http     = require('http'),
      express  = require('express'),
      socketIO = require('socket.io');
var a =0;
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  a=a+1;
  console.log(`New user connected: ${a}`);

  socket.on('createMessage', (message) => {
    console.log('createMess',message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  })
  socket.on('disconnect', () => {
    a=a-1;
    console.log(`User was disconnected: ${a}`);

  })
});

server.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
