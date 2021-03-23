class Sudoku {

    getView(req, res) {
        res.render('sudoku', {
            isLoggedIn: req.session.isLoggedIn
        })
    }
}

module.exports = Sudoku;