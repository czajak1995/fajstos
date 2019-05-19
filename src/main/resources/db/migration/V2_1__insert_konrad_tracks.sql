SET @tracks_path := '/home/ubuntu/wsi/konrad/';

REPLACE INTO tracks(id, name, path, voice_over_id) VALUES (NULL, 'ko', concat(@tracks_path, 'ko.mp3'), 2);
REPLACE INTO tracks(id, name, path, voice_over_id) VALUES (NULL, 'la', concat(@tracks_path, 'la.mp3'), 2);