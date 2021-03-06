package com.academic.repository;

import com.academic.model.Speaker;
import com.academic.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AudioRepository extends JpaRepository<Track, Long> {
    List<Track> findByNameAndSpeaker(String name, Speaker speaker);
}
