const express = require('express');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } })
const factory = require('./controllers/factory');
const PORT = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

// Session setup
app.use(session({
    secret: 'secret stuff',
    resave: false,
    saveUnitialized: false,
}))

app.use(express.static(__dirname + '/public'));

const config = require('./config/config.json');

for (let key in config['routes']) {

    let controller = factory.makeController(config['routes'][key]);


    app.get(key, (req, res) => {
        controller.getView(req, res);
    });

    app.post(key, (req, res) => {
        controller.post(req, res, config['db']);
    });


}

server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});




io.on('connection', (socket) => {

    console.log('User connected: ' + socket.id);


    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
    });
});

module.exports.io = io;