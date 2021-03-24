const db = require('mysql');


class GetUserScore {

    constructor(config) {
        this.connection = db.createConnection(config);
        this.connection.connect((error) => {
            if (error) throw error;
        })
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

}

module.exports = GetUserScore;