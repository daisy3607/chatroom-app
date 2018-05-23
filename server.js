const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io");
const PORT = 4000;


let user_room_map = [
    {userName: '倉鼠-薯泥', roomId: ''},
    {userName: '肥宅', roomId: ''},
    {userName: '媽媽', roomId: ''},
    {userName: '大眼妹', roomId: ''},
];

let chat_data = [
    {user: ['倉鼠-薯泥','肥宅'], message: []},
    {user: ['倉鼠-薯泥','媽媽'], message: []},
    {user: ['倉鼠-薯泥', '大眼妹'], message: []},
    {user: ['肥宅', '媽媽'], message: []},
    {user: ['肥宅', '大眼妹'], message: []},
    {user: ['媽媽', '大眼妹'], message: []},
];

app.get('/data', (req, res) => {
    const data = chat_data;
    res.send({data: data});
});



const server = io.listen(8888);

server.on("connection", (socket) => {
    // console.info(`Client connected [id=${socket.id}]`);
    socket.on('login', function(userObj) {
        console.log(userObj.myName,socket.id, "上限了");
        const usr = user_room_map.find(d => d.userName === userObj.myName);
        usr.roomId = socket.id;
    });



    socket.on('add msg', function(myName,usrName,msg) {
        const user = user_room_map.find(d => d.userName === usrName);
        console.log('chat with:',user);
        // console.log(usrName);
        const chatId = user.roomId;
        // if (chatId==="") { // 對方離線 => leave a msg
        console.log(myName,usrName,msg);
        const chat_usrs = (chat_data).filter(d => d.user[0] === myName || d.user[1] === myName);
        const cur_chat_usr = chat_usrs.find(d => d.user[0] === usrName || d.user[1] === usrName);
        cur_chat_usr.message.push({author: myName, text: msg});
        // console.log(cur_chat_usr.message);
        // }
        // else { // 對方在線上, 直接講話
        // console.log(chatId)
        server.to(chatId).emit('realtime chatting', user, msg);
        // }
    });

    // 離線要清除自己的roomId
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
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