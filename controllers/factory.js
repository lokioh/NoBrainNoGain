const Authentification = require('./Authentification');
const Home = require('./Home');
const Profil = require('./Profil');
const Sudoku = require('./Sudoku');
const Connect4 = require('./Connect4');
const Chess = require('./Chess');
const Dames = require('./Dames');

const classes = {
    Authentification,
    Home,
    Profil,
    Sudoku,
    Connect4,
    Chess,
    Dames
}

exports.makeController = (name, options) => {
    return new classes[name](options);
};