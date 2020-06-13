


"use strict";



const {express,http,socketIO} = require("./modules");

const app = express();

const server = http.createServer(app);

const socket = socketIO(server);

server.listen(8000,(_)=>{
    console.log("server started at localhost:8000");
});


socket.on('connection', (socket)=> {
    console.log('socket created');
    socket.on('disconnect', function() {
      console.log('Got disconnect!');
   });
   socket.on('lastKnownLocation', function (data) {
        const location = JSON.stringify(data);
        socket.emit('locationUpdate', location);
     });
});