SET @tracks_path := '/home/konrad/Documents/ac-project/wsi/fajstos/src/main/resources/tracks/dorota/';

REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES (NULL, 'ko', concat(@tracks_path, 'ko.mp3'), 1);
REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES (NULL, 'la', concat(@tracks_path, 'la.mp3'), 1);