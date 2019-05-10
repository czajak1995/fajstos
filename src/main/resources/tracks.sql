SET @tracks_path := 'C:\\Users\\vxjf37\\Documents\\dev\\PCA\\junk\\fajstos\\src\\main\\resources\\tracks\\';

REPLACE INTO Tracks(id, name, path) VALUES (NULL, 'ko', concat(@tracks_path, 'ko.mp3'));
REPLACE INTO Tracks(id, name, path) VALUES (NULL, 'la', concat(@tracks_path, 'la.mp3'));
