SET @tracks_path := '/home/ubuntu/wsi/dorota/';

REPLACE INTO tracks(id, name, path, voice_over_id) VALUES (NULL, 'ko', concat(@tracks_path, 'ko.mp3'), 1);
REPLACE INTO tracks(id, name, path, voice_over_id) VALUES (NULL, 'la', concat(@tracks_path, 'la.mp3'), 1);