var io = require('../app').io

class Home {

    getView(req, res) {
        res.render('home', {
            user: req.session.username, isLoggedIn: req.session.isLogged, mail: req.session.mail
        });
    }


}

module.exports = Home;