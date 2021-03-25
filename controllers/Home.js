const UserManagement = require('../models/UserManagement');

class Home {

    getView(req, res) {
        res.render('home', {
            user: req.session.username, isLoggedIn: req.session.isLogged, mail: req.session.mail
        });
    }

    post(req, res, config) {

        let model = new UserManagement(config);

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