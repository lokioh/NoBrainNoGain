-- Création des tables

CREATE TABLE IF NOT EXISTS user(
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
(1, 'sudoku', 60),
(2, 'chess', 90),
(3, 'dames', 46),
(4, 'connect4', 157);

INSERT INTO user (id_user, name_user, mail_user, pwd_user, about_user, score_user, score_chess_user, score_connect4_user, score_dames_user, score_sudoku_user) VALUES
(1, 'Loïc', 'loic@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 200, 85, 30, 60, 25),
(2, 'Vincent', 'vincent@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 160, 60, 50, 25, 25),
(3, 'Aravindan', 'aravindan@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 120, 30, 30, 20, 40),
(4, 'Bilal', 'bilal@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 120, 20, 40, 30, 30),
(5, 'Tom', 'tom@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 40, 0, 20, 0, 20),
(6, 'Victor', 'victor@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 20, 0, 15, 0, 5),
(7, 'Marwan', 'marwan@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 145, 45, 35, 20, 25),
(8, 'Invité', 'invite@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 0, 0, 0, 0, 0);