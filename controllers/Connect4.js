class Connect4 {

    getView(req, res) {
        res.render('connect4', {
            isLoggedIn: req.session.isLogged
        })
    }
}

module.exports = Connect4;