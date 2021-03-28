const GamesManagement = require('../models/GamesManagement');

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
    
}

module.exports = Dames;