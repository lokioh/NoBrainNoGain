const AuthentificationManagement = require('../models/AuthentificationManagement');
const GetUserInfo = require('../models/GetUserInfo');

class Authentification {

    getView(req, res) {

        res.render('authentification', {
            err_msg: ''
        });
    }

    post(req, res, config) {
        let mailLogin = req.body.emailLogin;
        let pwdLogin = req.body.passwordLogin;
        let mailRegister = req.body.emailRegister;
        let pwdRegister = req.body.passwordRegister;
        let nameRegister = req.body.nameRegister;

        let model = new AuthentificationManagement(config)
        let model1 = new GetUserInfo(config);


        if (mailLogin != null && pwdLogin != null) {

            model.mailIsGood(mailLogin).then((valid) => {
                if (!valid) {
                    console.log('ERREUR : mail incorrect.');
                    res.render('authentification', {err_msg: 'erreurLogin'});
                    
                } else {
                    model.pwdIsGood(mailLogin, pwdLogin).then((valid) => {
                        if (!valid) {
                            console.log('ERREUR : mot de passe incorrect.');
                            
                            res.render('authentification', {err_msg: 'erreurLogin'});
                            
                        } else {

                            model1.getName(mailLogin).then(function (result) {
                                req.session.isLogged = true;
                                req.session.username = result;

                                console.log('Connexion réussie.');
                                res.redirect('/');

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
                }
            }).catch((error) => {
                setImmediate(() => {
                    throw error;
                })
            })

        }


        if (mailRegister != null && pwdRegister != null) {

            model.mailIsTaken(mailRegister).then((valid) => {
                if (valid) {
                    console.log('ERREUR : Le mail est déjà utilisé.');
                    res.render('authentification', {err_msg: 'erreurRegister'});
                    
                } else {
                    model.addUser(nameRegister, mailRegister, pwdRegister);
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