const Authentification = require('./Authentification');
const Home = require('./Home');

const classes = {
    Authentification, 
    Home
}

exports.makeController = (name, options) => {
    return new classes[name](options);
};