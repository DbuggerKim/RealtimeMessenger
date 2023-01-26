var app = require('express')(); // express라는 모듈을 요청하여 http객체에 담아 핸들링
var http = require('http').createServer(app); // 서버 생성 및 제어
var io = require('socket.io')(http); // http에 socket.io 인스턴스로 초기화

//index.html 반환
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// connect event
io.on('connection', function(socket){
    console.log('user connected');
    
    // sendmessage event
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        //broadcastmessage event
        io.emit('chat message', msg);
    });

    // disconnect event
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

// http 서버가 포트 3000에서 수신 대기
http.listen(3000, function(){ 
  console.log('listening on *:3000');
});
