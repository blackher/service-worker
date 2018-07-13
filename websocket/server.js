let app = require('http').createServer(handler)
let io = require('socket.io')(app);
let fs = require('fs');

let socketPool=[];


app.listen(8081,function () {
    console.log("port listening...");
});

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {

    socket.on('disconnect', (reason) => {
        // ...
        console.log(reason);
        socketPool.pop(this);//pop socket
        console.log(socketPool.length);

    });

    socket.emit('news', { hello: 'world' });

    socket.join('room 123',()=>{
        let rooms = Object.keys(socket.rooms);
        //console.log(rooms); // [ <socket.id>, 'room 237' ]
        socketPool.push(this);
        console.log(socketPool.length);

    })

    //setTimeout("socket.emit('news',{hello:'world'})",1000)
    //socket.on('other', function (data) {
        //console.log(data);
    //});
    socket.on('speak',function(data){
        console.log(data);
        //其他人的聊天广播
        socket.broadcast.emit('other speak',data);

    })

});


