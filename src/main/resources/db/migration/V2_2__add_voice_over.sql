CREATE TABLE IF NOT EXISTS `Genders`
(
    `name` varchar(30) NOT NULL,
    PRIMARY KEY (`name`)
);

CREATE TABLE IF NOT EXISTS `VoiceOvers`
(
    `id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `gender` varchar(30) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `VoiceOversUnique` (`name`),
    KEY `fkIdx_77` (`gender`),
    CONSTRAINT `FK_77` FOREIGN KEY `fkIdx_77` (`gender`) REFERENCES `Genders` (`name`)
);