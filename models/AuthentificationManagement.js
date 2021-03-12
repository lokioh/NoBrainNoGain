const db = require('mysql');
const bcrypt = require('bcrypt');

class AuthentificationManagement {
    
    constructor(config) {
        this.connection = db.createConnection(config);
        this.connection.connect((error) => {
            if (error) throw error;
        })
    }

    mailIsTaken(mail) {
        let statement = 'SELECT mail_user FROM user WHERE mail_user = ?';

        this.connection.query(statement, [mail], (error, result) => {
            if(result != null) return false;
        });
    }

    mailIsGood(mailLogin) {
        let statement = 'SELECT * FROM user WHERE mail_user = ?';
        
        return new Promise((resolve, reject) => { //promesse qui att le résultat( res du resolve) pour continuer 
            this.connection.query(statement, [mailLogin], (error, result) => {
                if (error) return reject;
                return resolve(result.length > 0); 
            });
        });
    }

    pwdIsGood(pwdLogin) {
        let statement = 'SELECT * FROM user WHERE pwd_user = ?';
        
        return new Promise((resolve, reject) => { //promesse qui att le résultat( res du resolve) pour continuer 
            this.connection.query(statement, [pwdLogin], (error, result) => {
                if (error) return reject;
                return resolve(result.length > 0); 
            });
        });
    }

    addUser(mail, pwd) {
        let statement = 'INSERT INTO user (mail_user, pwd_user) VALUES(?,?)';

        this.connection.query(statement, [mail, pwd], (error) => {
            if(error) return error;
        });
    }
}

module.exports = AuthentificationManagement;