const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io");
const PORT = 4000;


let user_room_map = {'薯泥': '', '肥宅': '', '媽媽': '', '大眼妹': ''};

let chatroom_data = {
    '薯泥:肥宅': [{author: '薯泥', text: 'hi'}],
    '薯泥:媽媽': [{author: '薯泥', text: 'hi'}],
    '薯泥:大眼妹': [{author: '薯泥', text: 'hi'}],
    '肥宅:媽媽': [{author: '肥宅', text: 'hello'}],
    '肥宅:大眼妹': [{author: '肥宅', text: 'hello'}],
    '媽媽:大眼妹': [{author: '媽媽', text: 'hello'}],
};


app.get('/data', (req, res) => {
    res.send({data: chatroom_data});
});


const server = io.listen(8888);

server.on("connection", (socket) => {

    socket.on('login', function(userKey) {
        console.log(userKey,socket.id, "上限了");
        user_room_map[userKey] = socket.id;
    });

    socket.on('add msg', function(curRoomName, curRoomUser,msg) {
        // add msg to database
        chatroom_data[curRoomName].push(msg);
        const roomId = user_room_map[curRoomUser];
        // broacast newMsg to other client
        console.log(user_room_map);
        console.log(curRoomUser,roomId);
        server.to(roomId).emit('realtime chatting', msg);
    });

    socket.on('disconnect', function() {
        
        let usr = Object.keys(user_room_map).find(key => user_room_map[key]===socket.id);
        user_room_map[usr] = "",
        console.log(usr, '下線惹');

    })

    
    // 離線要清除自己的roomId
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
