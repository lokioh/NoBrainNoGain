const Authentification = require('./Authentification');
const Home = require('./Home');
const Profil = require('./Profil');

const classes = {
    Authentification,
    Home,
    Profil
}

exports.makeController = (name, options) => {
    return new classes[name](options);
};