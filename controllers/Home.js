const GetUserScore = require('../models/GetUserScore');

class Home {

    getView(req, res) {
        res.render('home', {
            user: req.session.username, isLoggedIn: req.session.isLogged
        });
    }

    post(req, res, config) {

        let model = new GetUserScore(config);

        model.getMeanScore().then((result) => {
            res.send(result);
        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })
    }

}

module.exports = Home;