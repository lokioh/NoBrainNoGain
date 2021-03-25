const UserManagement = require('../models/UserManagement');
const AuthentificationManagement = require('../models/AuthentificationManagement')

class Profil {

    getView(req, res) {
        res.render('profil', {
            isLoggedIn: req.session.isLogged, user: req.session.username, mail: req.session.mail
        });
    }

    post(req, res, config) {
        let mailModif = req.body.emailModif;
        let nameModif = req.body.nameModif;
        let pwdModif = req.body.pwdModif;
        let mail = req.session.mail;

        let modelUser = new UserManagement(config);
        let modelAuthentification = new AuthentificationManagement(config);

            modelUser.getDataUser(req.session.mail).then((result) => {
                res.send(result);
            }).catch((error) => {
                setImmediate(() => {
                    throw error;
                })
            })


        if(nameModif != null) {

            modelUser.modifUserName(nameModif, mail).then((valid) => {
                if(!valid) {
                    console.log('ERREUR : modification impossible.');
                } else {
                    req.session.username = nameModif;
                    res.redirect('/Authentification');
                    console.log(nameModif);
                }
            }).catch((error) => {
                setImmediate(() => {
                    throw error;
                })
            })
        }

    }
}

module.exports = Profil;