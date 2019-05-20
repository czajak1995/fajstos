SET @tracks_path := 'C:\\Users\\vxjf37\\Documents\\dev\\PCA\\junk\\fajstos\\src\\main\\resources\\tracks\\dorota\\';

REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES (NULL, 'ko', concat(@tracks_path, 'ko.mp3'), 1);
REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES (NULL, 'la', concat(@tracks_path, 'la.mp3'), 1);