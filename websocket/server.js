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
    //socket.emit('news', { hello: 'world' });
    console.log(socket.id);
    console.log(socket.rooms);
    socket.join('room 123',()=>{
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
    })

    //setTimeout("socket.emit('news',{hello:'world'})",1000)
    socket.on('other', function (data) {
        console.log(data);
    });
});

