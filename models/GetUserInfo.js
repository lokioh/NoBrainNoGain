const db = require('mysql');


class GetUserInfo {

    constructor(config) {
        this.connection = db.createConnection(config);
        this.connection.connect((error) => {
            if (error) throw error;
        })
    }

    getName(mail) {
        let statement = 'SELECT name_user FROM user WHERE mail_user = ?';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, mail, (error, result) => {
                if (error) return reject;
                return resolve(result[0].name_user);
            });
        });
    }
}

module.exports = GetUserInfo;