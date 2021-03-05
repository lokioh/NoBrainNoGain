const AuthentificationManagement = require('../models/AuthentificationManagement');

class Authentification {

    getView(req, res) {
        res.render('authentification');
    }

    post(req, res, config) {
        console.log('ui');
        let mailLogin = req.body.emailLogin;
        let pwdLogin = req.body.passwordLogin;
        let mailRegister = req.body.emailRegister;
        let pwdRegister = req.body.passwordRegister;
        let model = new AuthentificationManagement(config);
        

        if (mailLogin != null && pwdLogin != null) {

            model.mailIsGood(mailLogin).then((valid) => {
                if(!valid) {
                    console.log('Le mail est incorrect');
                    res.redirect('/Authentification');
                } else {
                    model.pwdIsGood(pwdLogin).then((valid) => {
                        if(!valid){
                            console.log('Le mot de passe est incorrect');
                            res.redirect('/Authentification');
                        } else {
                            console.log('Connexion réussie avec succès !');
                            res.redirect('/');
                        }
                    }).catch((error) => {
                        setImmediate(() => {
                            throw error;
                        })
                    })
                }
            }).catch((error) => {
                setImmediate(()=> {
                    throw error;
                })
            })
            
        } else {
            model.addUser(mailRegister, pwdRegister);
            res.redirect('/Authentification');
            console.log('Inscription réusie avec succès !');
        }
       
    }
}

module.exports = Authentification;