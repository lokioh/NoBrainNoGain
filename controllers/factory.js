const Authentification = require('./Authentification');
const Home = require('./Home');
const Profil = require('./Profil');
const Sudoku = require('./Sudoku');
const Connect4 = require('./Connect4');

const classes = {
    Authentification,
    Home,
    Profil,
    Sudoku,
    Connect4
}

exports.makeController = (name, options) => {
    return new classes[name](options);
};