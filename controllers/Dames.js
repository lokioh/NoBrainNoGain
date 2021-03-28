const GamesManagement = require('../models/GamesManagement');
const UserManagement = require('../models/UserManagement');

class Dames {

    getView(req, res) {
        res.render('dames', {
            isLoggedIn: req.session.isLogged
        })
    }

    post(req, res, config) {
        let dames = req.body.useDames;
        let name = 'dames';

        let modelGames = new GamesManagement(config);

        modelGames.updateUse(dames, name).then((valid) => {
            if(!valid){
                console.log('Donnée reçue.');
            }

        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }

    getScoreDames(req, res, config) {
        let scoreDames = req.body.scoreDames;
        let mail = req.session.mail;

        let modelUser = new UserManagement(config);

        modelUser.updateUserScoreDames(mail, scoreDames).then((valid) => {
            console.log('Donnée reçue');
        }).catch((error) => {
            setImmediate(() =>{
                throw error;
            })
        })
    }
    
}

module.exports = Dames;