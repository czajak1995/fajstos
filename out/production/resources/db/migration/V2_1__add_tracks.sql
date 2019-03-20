SET @tracks_path := '/home/konrad/Documents/ac-project/wsi/fajstos/src/main/resources/tracks/';

REPLACE INTO Tracks(id, name, path) VALUES (NULL, "la", concat(@tracks_path, 'la.mp3'));
REPLACE INTO Tracks(id, name, path) VALUES (NULL, "ko", concat(@tracks_path, 'ko.mp3'));
