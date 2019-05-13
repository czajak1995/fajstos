package com.academic.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity(name = "tracks")
public class Track {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String path;

    @ManyToOne
    @JoinColumn(name = "voice_over_id")
    private Speaker speaker;

    @Transient
    private ByteArrayResource streamResource;

    public Track(String name, String path) {
        this.name = name;
        this.path = path;
    }

}
