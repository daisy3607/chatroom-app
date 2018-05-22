var app = require('express')();
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
const PORT = 4000;


// app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/chat-react/public/index.html');
// });

const io = require("socket.io");
const server = io.listen(4000);
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

});

// var onlineUsers = {};
// io.on('connection', function(socket) {
//     socket.on('login', function(userObj) {
//         socket.id = userobj.id;
//         // console.log(userObj.myName,'上線惹');
//         console.log('hi');

//     })
//     
//     // Given a unique room name for every user.
//     var roomNum = 'room' + (++count); 
//     socket.join(roomNum, function() { // join a room / leave a room
//         console.log(socket.rooms);
//     });

//     // Message only for the user in current room
//     socket.on('chat message', function(msg) {
//         console.log(msg);
//         var room = Object.keys(socket.rooms)[1]; // current room
//         io.to(room).emit(msg);
//         console.log(room, '有新訊息: ');
//     }); // start to listen to the room.
// });

// http.listen(PORT, function() {
//     console.log('listening on *:3000');
// })