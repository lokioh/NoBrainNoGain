const UserManagement = require('../models/UserManagement');
const GamesManagement = require('../models/GamesManagement');
var io = require('../app').io

class Home {

    getView(req, res) {
        res.render('home', {
            user: req.session.username, isLoggedIn: req.session.isLogged, mail: req.session.mail
        });
    }

    post(req, res, config) {

        let modelUser = new UserManagement(config);

        modelUser.getMeanScore().then((result) => {
            res.send(result);
        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }

    getDataHome(req, res, config) {

        let modelGames = new GamesManagement(config);

        modelGames.getUseGames().then((result) => {
            res.send(result);
        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }

}

module.exports = Home;