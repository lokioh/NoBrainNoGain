

class Chess {

    getView(req, res) {
        res.render('chess', {
            isLoggedIn: req.session.isLogged
        })
    }

}

module.exports = Chess;