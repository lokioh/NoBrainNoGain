const GamesManagement = require('../models/GamesManagement');

class Connect4 {

    getView(req, res) {
        res.render('connect4', {
            isLoggedIn: req.session.isLogged
        })
    }

    post(req, res, config) {
        let connect4 = req.body.use;
        let name = 'connect4';

        let model = new GamesManagement(config);

        model.updateUseConnect4(connect4, name).then((valid) => {
            if(!valid){
                console.log('YAAAS');
            }

        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }
}

module.exports = Connect4;