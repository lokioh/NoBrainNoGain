const express = require('express');
const app = express();
const factory = require('./controllers/factory');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

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

app.listen(PORT);