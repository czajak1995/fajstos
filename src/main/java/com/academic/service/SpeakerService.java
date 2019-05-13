package com.academic.service;

import com.academic.model.Speaker;
import com.academic.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpeakerService {

    @Autowired
    private SpeakerRepository speakerRepository;

    public List<String> getAllSpeakersNames() {
        return speakerRepository.findAll().stream()
                .map(speaker -> speaker.getName())
                .collect(Collectors.toList());
    }
}
