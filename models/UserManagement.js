const db = require('mysql');
const bcrypt = require('bcrypt');

class UserManagement {

    constructor(config) {
        this.connection = db.createConnection(config);
        this.connection.connect((error) => {
            if (error) throw error;
        })
    }

    //méthode récupérant le nom de l'utilisateur
    getName(mail) {
        let statement = 'SELECT name_user FROM user WHERE mail_user = ?';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, mail, (error, result) => {
                if (error) return reject;
                return resolve(result[0].name_user);
            });
        });
    }

    getDataUser(mail) {
        let statement = 'SELECT name_user, mail_user, about_user, score_user, score_chess_user, score_connect4_user, score_dames_user, score_sudoku_user FROM User WHERE mail_user = ?'; 
    
        return new Promise((resolve, reject) => {
            this.connection.query(statement, mail, (error, result) => {
                if (error) return reject;
                return resolve(JSON.stringify(result));
            });
        });
    }

    getMeanScore() {
        let statement = 'SELECT name_user, score_user FROM User ORDER BY score_user DESC';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, (error, result) => {
                if (error) return reject
                return resolve(JSON.stringify(result));
            });
        });
    }

    getUserScore(mail) {
        let statement = 'SELECT score_user, score_chess_user, score_connect4_user, score_dames_user, score_sudoku_user FROM USER WHERE mail_user = ?';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, [mail], (error, result) => {
                if(error) return reject;
                return resolve(JSON.stringify(result));
            });
        });
    }

    modifUser(nameModif, pwdModif, aboutMeModif, mail) {
        let statement = 'UPDATE User SET name_user = ?, pwd_user = ?, about_user = ? WHERE mail_user = ?';

        return new Promise((resolve, reject) => {
            bcrypt.hash(pwdModif, 10).then((hash_password_modif) => {
                this.connection.query(statement, [nameModif, hash_password_modif, aboutMeModif, mail], (error, result) => {
                    if(error) return error;
                    return resolve(result.length > 0);
                });
            });
        });
    }

}

module.exports = UserManagement;