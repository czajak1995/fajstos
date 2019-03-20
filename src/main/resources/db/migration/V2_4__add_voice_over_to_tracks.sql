ALTER TABLE Tracks
    ADD voice_over_id INTEGER,
    ADD CONSTRAINT FOREIGN KEY(voice_over_id) REFERENCES VoiceOvers(id);

UPDATE Tracks SET voice_over_id = 1;