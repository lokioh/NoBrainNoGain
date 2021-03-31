const Home = require('./Home');
const Sudoku = require('./Sudoku');
const Connect4 = require('./Connect4');
const Chess = require('./Chess');
const Dames = require('./Dames');

const classes = {
    Home,
    Sudoku,
    Connect4,
    Chess,
    Dames
}

exports.makeController = (name, options) => {
    return new classes[name](options);
};