

class Dames {

    getView(req, res) {
        res.render('dames', {
            isLoggedIn: req.session.isLogged
        })
    }

    
    
}

module.exports = Dames;