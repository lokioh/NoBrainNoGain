class Home {

    getView(req, res) {
        res.render('home', {
            user: req.session.username, isLoggedIn: req.session.isLogged
        });
    }

}

module.exports = Home;