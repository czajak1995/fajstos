package com.academic.service;

import com.academic.model.Track;
import com.academic.repository.AudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AudioService {

    @Autowired
    private AudioRepository audioRepository;

    public Track getTrackByName(String name) {
        List<Track> tracks = audioRepository.findByName(name);

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
