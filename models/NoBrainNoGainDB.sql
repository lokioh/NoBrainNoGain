-- Création des tables

CREATE TABLE IF NOT EXISTS User(
    id_user INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_user TEXT NOT NULL,
    mail_user TEXT NOT NULL,
    pwd_user TEXT NOT NULL,
    about_user TEXT NOT NULL, 
    score_user INT NOT NULL,
    score_chess_user INT NOT NULL,
    score_connect4_user INT NOT NULL,
    score_dames_user INT NOT NULL,
    score_sudoku_user INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS Games (
    id_games INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_games TEXT NOT NULL,
    rate_use_games INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Insertion des données dans la bdd

INSERT INTO Games (id_games, name_games, rate_use_games) VALUES
(1, 'sudoku', 0),
(2, 'chess', 0),
(3, 'dames', 0),
(4, 'connect4', 0);

INSERT INTO User (id_user, name_user, mail_user, pwd_user) VALUES
(1, 'chomeur', 'test@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG');