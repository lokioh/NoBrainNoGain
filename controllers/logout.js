exports.logout = (req, res) => {
    if (req.session.isLogged) {
        req.session.destroy(() => {
            res.redirect('/');
            console.log("Déconnexion réussie.");
        });
    }
}