const GamesManagement = require('../models/GamesManagement');

class Sudoku {

    getView(req, res) {
        res.render('sudoku', {
            isLoggedIn: req.session.isLoggedIn
        })
    }

    post(req, res, config) {
        let sudoku = req.body.useSudoku;
        let name = 'sudoku';

        let modelGames = new GamesManagement(config);

        modelGames.updateUse(sudoku, name).then((valid) => {
            if(!valid){
                console.log('Donnée reçue.');
            }

        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }
    
}

module.exports = Sudoku;