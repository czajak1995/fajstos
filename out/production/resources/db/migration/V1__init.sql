CREATE TABLE IF NOT EXISTS `Tracks`
(
    `id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `path` varchar(90) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `TracksUnique` (`name`)
);