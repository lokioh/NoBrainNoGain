const db = require('mysql');
const bcrypt = require('bcrypt');

class AuthentificationManagement {
    
    constructor(config) {
        this.connection = db.createConnection(config);
        this.connection.connect((error) => {
            if (error) throw error;
        })
    }

    //méthode qui vérifie si l'email est déjà utilisé
    mailIsTaken(mail) {
        let statement = 'SELECT mail_user FROM user WHERE mail_user = ?';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, [mail], (error, result) => {
                if(error) return reject;
                return resolve(result.length > 0);
            });
        });
        
    }

    //méthode qui vérifie si l'email est bon
    mailIsGood(mailLogin) {
        let statement = 'SELECT * FROM user WHERE mail_user = ?';
        
        return new Promise((resolve, reject) => { //promesse qui att le résultat( res du resolve) pour continuer 
            this.connection.query(statement, [mailLogin], (error, result) => {
                if (error) return reject;
                return resolve(result.length > 0); 
            });
        });
    }

    //méthode qui vérifie si le mot de passe est bon et correspond au mot de passe crypté
    pwdIsGood(mailLogin, pwdLogin) {
        let statement = 'SELECT * FROM user WHERE mail_user = ?';
        
        return new Promise((resolve, reject) => { //promesse qui att le résultat( res du resolve) pour continuer 
            this.connection.query(statement, mailLogin, (error, result) => {
                if (error) return reject;
                return resolve(bcrypt.compare(pwdLogin, result[0].pwd_user)); 
            });
        });
    }

    //méthode qui ajoute un nouvel utilisateur
    addUser(name, mail, pwd) {
        let statement = 'INSERT INTO user (name_user, mail_user, pwd_user) VALUES(?,?,?)';

        bcrypt.hash(pwd, 10).then((hash_password) => {
            this.connection.query(statement, [name, mail, hash_password], (error) => {
                if(error) return error;
            });
        });
    }
}

module.exports = AuthentificationManagement;