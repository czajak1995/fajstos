package com.academic.service;

import com.academic.model.Speaker;
import com.academic.model.Track;
import com.academic.repository.AudioRepository;
import com.academic.repository.SpeakerRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

    @Autowired
    private SpeakerRepository speakerRepository;

    public Track getTrackByNameAndSpeaker(String name, String speakerName) {
        Speaker speaker = speakerRepository.findOneByName(speakerName);
        if(speaker == null) {
            return null;
        }

        List<Track> tracks = audioRepository.findByNameAndSpeaker(name, speaker);

        if(tracks == null || tracks.size() == 0) return null;

        Track track = tracks.get(0);
        String path = track.getPath();
        File mp3File = new File(path);

        try(FileInputStream is = new FileInputStream(mp3File)) {
            byte[] bytes = IOUtils.toByteArray(is);
            ByteArrayResource isr = new ByteArrayResource(bytes);
            track.setStreamResource(isr);
        } catch(FileNotFoundException fnfe) {
            fnfe.printStackTrace();
            return null;
        } catch (IOException ioe) {
            ioe.printStackTrace();
            return null;
        }

        return track;
    }

    public InputStreamResource getMergedAudio(List<String> names, String speaker) {
        List<Track> partTracks = new ArrayList<>();

        for(String name : names) {
            Track track = getTrackByNameAndSpeaker(name, speaker);
            if(track != null) partTracks.add(track);
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
