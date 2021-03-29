-- Création des tables

CREATE TABLE IF NOT EXISTS User (
    id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
    id_games INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_games TEXT NOT NULL,
    rate_use_games INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Insertion des données dans la bdd

INSERT INTO Games (id_games, name_games, rate_use_games) VALUES
(1, 'sudoku', 70),
(2, 'chess', 100),
(3, 'dames', 54),
(4, 'connect4', 124);

INSERT INTO User (id_user, name_user, mail_user, pwd_user, about_user, score_user, score_chess_user, score_connect4_user, score_dames_user, score_sudoku_user) VALUES
(1, 'Loïc', 'loic@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 200, 60, 40, 50, 50),
(2, 'Vincent', 'vincent@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 160, 35, 45, 40, 40),
(3, 'Aravindan', 'aravindan@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 120, 25, 20, 35, 20),
(4, 'Bilal', 'bilal@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 120, 20, 35, 20, 25),
(5, 'Tom', 'tom@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 80, 0, 40, 20, 20),
(6, 'Victor', 'victor@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 75, 0, 40, 20, 15),
(7, 'Invité', 'invite@mail.com', '$2b$10$H69/mgaqxg6NzosxEriK9.Uw8a./t0l01dmHqTwKszuY/CjTwE7sG', ' ', 0, 0, 0, 0, 0),