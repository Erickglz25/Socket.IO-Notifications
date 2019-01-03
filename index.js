var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var users = {};

io.on('connection', function(socket){

    var myName = socket.id; //arraylist or db 
    users[myName] = socket;

    console.log('a user connected');  

    socket.on('new_notification',function(data){
        console.log(data.title,data.message);
        io.sockets.emit('show_notification',{
            title: data.title,
            message: data.message,
            icon:data.icon,
        });
    });

    socket.on('getusers',function(){
        io.engine === io.eio // => true
        let clients = Object.keys(io.engine.clients)
        socket.emit('list',clients)
    });

    socket.on('specificClient',function(socketname){
      users[socketname].emit('sendToclient');
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});





