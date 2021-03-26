const AuthentificationManagement = require('../models/AuthentificationManagement');
const UserManagement = require('../models/UserManagement');

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

        let modelAuthentification = new AuthentificationManagement(config)
        let modelUser = new UserManagement(config);


        if (mailLogin != null && pwdLogin != null) {

            modelAuthentification.mailIsGood(mailLogin).then((valid) => {
                if (!valid) {
                    console.log('ERREUR : mail incorrect.');
                    res.render('authentification', { err_msg: 'erreurLogin' });

                } else {
                    modelAuthentification.pwdIsGood(mailLogin, pwdLogin).then((valid) => {
                        if (!valid) {
                            console.log('ERREUR : mot de passe incorrect.');

                            res.render('authentification', { err_msg: 'erreurLogin' });

                        } else {

                            modelUser.getName(mailLogin).then(function (result) {

                                req.session.isLogged = true;
                                req.session.username = result;
                                req.session.mail = mailLogin;

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

            modelAuthentification.mailIsTaken(mailRegister).then((valid) => {
                if (valid) {
                    console.log('ERREUR : Le mail est déjà utilisé.');
                    res.render('authentification', { err_msg: 'erreurRegister' });

                } else {
                    modelAuthentification.addUser(nameRegister, mailRegister, pwdRegister);
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