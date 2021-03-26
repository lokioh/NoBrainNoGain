const socket = io ('http://localhost:3000/test');

socket.on('connection', () => {
    console.log(socket.id);
});