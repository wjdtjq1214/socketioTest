var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(3000);

function  handler(req, res) {
    fs.readFile('./index.html', function (err, data) {
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
        res.end(data);
    })
}

io.on('connection', function (socket) {
   socket.emit('news', {serverData : "서버 작동"});

   socket.on('client login', function (data) {
       console.log(data);
   });

   socket.on('disconnect', function () {
       console.log('접속이 종료되었습니다.');
   });
});