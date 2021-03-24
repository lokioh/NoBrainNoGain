const GetUserScore = require('../models/GetUserScore');

class Profil {

    getView(req, res) {
        res.render('profil', {
            isLoggedIn: req.session.isLogged, user: req.session.username
        });
    }

    post(req, res, config) {
        let model = new GetUserScore(config);

        model.getUserScore().then((result) => {
            res.send(result);
        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }
}

module.exports = Profil;