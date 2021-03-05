CREATE TABLE IF NOT EXISTS User(
    id_user INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mail_user TEXT NOT NULL,
    pwd_user TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO User (id_user, mail_user, pwd_user) VALUES
(1, 'loic@mail.com', 'password');