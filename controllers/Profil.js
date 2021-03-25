const UserManagement = require('../models/UserManagement');
const AuthentificationManagement = require('../models/AuthentificationManagement');

class Profil {

    getView(req, res) {
        res.render('profil', {
            isLoggedIn: req.session.isLogged, user: req.session.username, mail: req.session.mail
        });
    }

    post(req, res, config) {
        let nameModif = req.body.nameModif;
        let pwdModif = req.body.pwdModif;
        let aboutMeModif = req.body.aboutMeModif;
        let mail = req.session.mail;

        let modelUser = new UserManagement(config);

        if(nameModif != null && pwdModif != null && aboutMeModif != null) {

            modelUser.modifUser(nameModif, pwdModif, aboutMeModif, mail).then((valid) => {

                if(valid) {
                    console.log('ERREUR : modification impossible.');
                    res.redirect('/Profil');
                } else {
                    console.log('Modification du nom réussie.');
                    res.redirect('/Profil');
                    req.session.username = nameModif;
                }

            }).catch((error) => {
                setImmediate(() => {
                    throw error;
                })
            })
        }

    }

    getData(req, res, config) {

        let modelUser = new UserManagement(config);

        modelUser.getDataUser(req.session.mail).then((result) => {
            res.send(result);
        }).catch((error) => {
            setImmediate(() => {
                throw error;
            })
        })

    }
}

module.exports = Profil;