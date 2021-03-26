const express = require('express');
const session = require('express-session');
const app = express();
const factory = require('./controllers/factory');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 3000;

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

app.listen(PORT);