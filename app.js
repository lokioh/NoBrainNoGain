const express = require('express');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);
const io =require('socket.io')(server, { cors: { origin: "*" }})
const factory = require('./controllers/factory');
const PORT = process.env.PORT || 3000;

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
const user = require('./controllers/logout');

for (let key in config['routes']) {

    if (key == '/logout') {

        app.get(key, (req, res) => {
            user.logout(req, res)
        })
        
    } else {

        let controller = factory.makeController(config['routes'][key]);

        if(key == '/dataProfil'){

            app.post(key, (req, res) => {
                controller.getDataProfil(req, res, config['db']);
            });

        } else if (key == '/dataHome'){ 

            app.post(key, (req, res) => {
                controller.getDataHome(req, res, config['db']);
            });

        } else if(key == '/dataScoreConnect4') {

            app.post(key, (req, res) => {
                controller.getScoreConnect4(req, res, config['db']);
            });

        } else if(key == '/dataScoreChess') {

            app.post(key, (req, res) => {
                controller.getScoreChess(req, res, config['db']);
            });

        } else if(key == '/dataScoreDames') {

            app.post(key, (req, res) => {
                controller.getScoreDames(req, res, config['db']);
            });

        } else if (key == '/dataScoreSudoku') {

            app.post(key, (req, res) => {
                controller.getScoreSudoku(req, res, config['db']);
            });

        } else {

            app.get(key, (req, res) => {
                controller.getView(req, res);
            });
    
            app.post(key, (req, res) => {
                controller.post(req, res, config['db']);
            });

        }

    }
}

server.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});




io.on('connection', (socket) => {
    
    console.log('User connected: ' + socket.id);

    socket.emit('message', 'hey');

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
    });
});

module.exports.io = io;