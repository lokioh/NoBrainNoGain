class Profil {

    getView(req, res) {
        res.render('profil', {
            isLoggedIn: req.session.isLogged, user: req.session.username
        });
    }
}

module.exports = Profil;