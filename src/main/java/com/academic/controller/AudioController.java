package com.academic.controller;

import com.academic.model.Track;
import com.academic.service.AudioService;
import com.academic.service.SpeakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/audio")
public class AudioController {

    @Autowired
    AudioService audioService;

    @Autowired
    SpeakerService speakerService;

    @GetMapping(params = {"track_name"})
    public ResponseEntity<ByteArrayResource> getTrackByName(
            @RequestParam(value = "track_name") String name,
            @RequestParam(value = "speaker", defaultValue = "dorota", required = false) String speaker) {
        HttpStatus status = HttpStatus.OK;

        Track track = audioService.getTrackByNameAndSpeaker(name, speaker);

        if (track == null) {
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<>(status);
        }

        return new ResponseEntity<>(track.getStreamResource(), getMp3Headers(), status);
    }

    @GetMapping(params = {"track_names"}, path = "/merge")
    public ResponseEntity<InputStreamResource> getMergedAudio(
            @RequestParam(value = "track_names") List<String> names,
            @RequestParam(value = "speaker", defaultValue = "dorota", required = false) String speaker) {
        HttpStatus status = HttpStatus.OK;

        InputStreamResource isr = audioService.getMergedAudio(names, speaker);

        if (isr == null) {
            status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(isr, getMp3Headers(), status);
    }

    @GetMapping(path = "/speakers")
    public ResponseEntity<List<String>> getAllSpeakerNames() {
        HttpStatus status = HttpStatus.OK;

        List<String> speakerNames = speakerService.getAllSpeakersNames();
        if(speakerNames == null || speakerNames.size() == 0) {
            status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(speakerNames, status);
    }

    private HttpHeaders getMp3Headers() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("audio/mpeg"));
        return headers;
    }
}
