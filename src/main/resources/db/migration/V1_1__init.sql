CREATE TABLE IF NOT EXISTS `genders`
(
    `name` varchar(30) NOT NULL,
    PRIMARY KEY (`name`)
);

CREATE TABLE IF NOT EXISTS `voiceovers`
(
    `id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `gender` varchar(30) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `VoiceOversUnique` (`name`),
    KEY `fkIdx_77` (`gender`),
    CONSTRAINT `FK_77` FOREIGN KEY `fkIdx_77` (`gender`) REFERENCES `genders` (`name`)
);

CREATE TABLE IF NOT EXISTS `tracks`
(
    `id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `path` varchar(90) NOT NULL,
    `voice_over_id` integer NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fkIdx_78` (`voice_over_id`),
    CONSTRAINT `FK_78` FOREIGN KEY `fkIdx_78` (`voice_over_id`) REFERENCES `voiceovers` (`id`)
);