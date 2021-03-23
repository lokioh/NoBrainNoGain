const Authentification = require('./Authentification');
const Home = require('./Home');
const Profil = require('./Profil');
const Sudoku = require('./Sudoku');

const classes = {
    Authentification,
    Home,
    Profil,
    Sudoku
}

exports.makeController = (name, options) => {
    return new classes[name](options);
};