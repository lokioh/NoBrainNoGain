const GamesManagement = require('../models/GamesManagement');
const UserManagement = require('../models/UserManagement');

class Chess {

    getView(req, res) {
        res.render('chess', {
            isLoggedIn: req.session.isLogged
        })
    }

    post(req, res, config) {
        let chess = req.body.useChess;
        let name = 'chess';

        let modelGames = new GamesManagement(config);

        modelGames.updateUse(chess, name).then((valid) => {
            if(!valid){
                console.log('Donée reçue.');
            }

        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })

    }

    getScoreChess(req, res, config) {
        let scoreChessUser = req.body.scoreChess;
        let mail = req.session.mail;

        console.log(scoreChessUser);

        let modelUser = new UserManagement(config);

        modelUser.updateUserScoreChess(mail, scoreChessUser).then((valid) => {
            console.log('Donnée reçue');
        }).catch((error) => {
            setImmediate(() =>{
                throw error;
            })
        })
    }
}

module.exports = Chess;