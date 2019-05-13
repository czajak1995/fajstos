SET @tracks_path := 'C:\\Users\\vxjf37\\Documents\\dev\\PCA\\junk\\fajstos\\src\\main\\resources\\tracks\\konrad\\';

REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES (NULL, 'ko', concat(@tracks_path, 'ko.mp3'), 2);
REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES (NULL, 'la', concat(@tracks_path, 'la.mp3'), 2);