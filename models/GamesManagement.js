const db = require('mysql');

class GamesManagement {

    constructor(config) {
        this.connection = db.createConnection(config);
        this.connection.connect((error) => {
            if (error) throw error;
        })
    }

    updateUse(use, gameName) {
        let statement = 'UPDATE games SET rate_use_games = rate_use_games + ? WHERE name_games = ?';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, [use, gameName], (error, result) => {
                if(error) return reject;
                return resolve(result.length > 0);
            });
        });
    }

    getUseGames() {
        let statement = 'SELECT name_games, rate_use_games FROM games';

        return new Promise((resolve, reject) => {
            this.connection.query(statement, (error, result) => {
                if(error) return reject
                return resolve(JSON.stringify(result));
            });
        });

    }

}

module.exports = GamesManagement;