const GamesManagement = require('../models/GamesManagement');
const UserManagement = require('../models/UserManagement');

class Connect4 {

    getView(req, res) {
        res.render('connect4', {
            isLoggedIn: req.session.isLogged
        })
    }

    post(req, res, config) {
        let connect4 = req.body.useConnect4;
        let name = 'connect4';

        let modelGames = new GamesManagement(config);

        modelGames.updateUseConnect4(connect4, name).then((valid) => {
            if(!valid){
                console.log('Donnée reçue.')
            }

        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }

    getScoreConnect4(req, res, config) {
        let scoreConnect4 = req.body.scoreConnect4;
        let mail = req.session.mail;

        console.log(scoreConnect4);

        let modelUser = new UserManagement(config);

        modelUser.updateUserScoreConnect4(mail, scoreConnect4).then((valid) => {
            console.log('Donnée reçue');
        }).catch((error) => {
            setImmediate(() =>{
                throw error;
            })
        })
    }


}

module.exports = Connect4;