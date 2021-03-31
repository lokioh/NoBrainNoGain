const GamesManagement = require('../models/GamesManagement');
const UserManagement = require('../models/UserManagement');

class Connect4 {

    getView(req, res) {
        res.render('connect4', {
            isLoggedIn: req.session.isLogged
        })
    }

    

}

module.exports = Connect4;