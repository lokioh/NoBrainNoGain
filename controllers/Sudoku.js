const GamesManagement = require('../models/GamesManagement');
const UserManagement = require('../models/UserManagement');

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


    getScoreSudoku(req, res, config) {
        let scoreSudoku = req.body.scoreSudoku;
        let mail = req.session.mail;

        let modelUser = new UserManagement(config);

        modelUser.updateUserScoreSudoku(mail, scoreSudoku).then((valid) => {
            console.log('Donnée reçue');
        }).catch((error) => {
            setImmediate(() =>{
                throw error;
            })
        })
    }
    
}

module.exports = Sudoku;