const AuthentificationManagement = require('../models/AuthentificationManagement');

class Authentification {

    getView(req, res) {
        res.render('authentification');
    }

    post(req, res, config) {
        let mailLogin = req.body.emailLogin;
        let pwdLogin = req.body.passwordLogin;
        let mailRegister = req.body.emailRegister;
        let pwdRegister = req.body.passwordRegister;
        let model = new AuthentificationManagement(config);


        if (mailLogin != null && pwdLogin != null) {

            model.mailIsGood(mailLogin).then((valid) => {
                if (!valid) {
                    console.log('ERREUR : mail incorrect.');
                    res.redirect('/Authentification');
                } else {
                    model.pwdIsGood(mailLogin, pwdLogin).then((valid) => {
                        if (!valid) {
                            console.log('ERREUR : mot de passe incorrect.');
                            res.redirect('/Authentification');
                        } else {
                            req.session.isLogged = true;
                            req.session.username = mailLogin;
                            console.log('Connexion réussie.');
                            res.redirect('/');
                        }
                    }).catch((error) => {
                        setImmediate(() => {
                            throw error;
                        })
                    })
                }
            }).catch((error) => {
                setImmediate(() => {
                    throw error;
                })
            })

        } else {

            model.mailIsTaken(mailRegister).then((valid) => {
                if(valid){
                    console.log('ERREUR : Le mail est déjà utilisé.');
                    res.redirect('/Authentification');
                } else {
                    model.addUser(mailRegister, pwdRegister);
                    res.redirect('/Authentification');
                    console.log('Inscription réussie.');
                }
            }).catch((error) => {
                setImmediate(() => {
                    throw error;
                })
            })
        }

    }
}

module.exports = Authentification;