package com.academic.service;

import com.academic.model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class AudioService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Track getTrackByName(String name) {
        String GET_TRACK_BY_NAME_SQL = "SELECT name, path FROM Tracks WHERE name='" + name + "'";

        List<Track> tracks = jdbcTemplate.query(GET_TRACK_BY_NAME_SQL,
                (rs, rowNum) -> new Track(
                        rs.getString(1),
                        rs.getString(2)
                )
        );

        if(tracks == null || tracks.size() == 0) return null;

        Track track = tracks.get(0);
        String path = track.getPath();
        File mp3File = new File(path);

        try {
            InputStreamResource isr = new InputStreamResource(new FileInputStream(mp3File));
            track.setStreamResource(isr);
        } catch(FileNotFoundException fnfe) {
            return null;
        }

        return track;
    }

    public InputStreamResource getMergedAudio(List<String> names) {
        List<Track> partTracks = new ArrayList<>();

        for(String name : names) {
            partTracks.add(getTrackByName(name));
        }

        if(partTracks.size() != names.size()) return null;

        List<InputStream> partInputStreams = new ArrayList<>();

        try {
            for (Track track : partTracks) {
                partInputStreams.add(track.getStreamResource().getInputStream());
            }

        } catch(IOException ioe) {
            return null;
        }

        SequenceInputStream sis = new SequenceInputStream(Collections.enumeration(partInputStreams));

        return new InputStreamResource(sis, "track");
    }

}
