package com.academic.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "voiceovers")
public class Speaker {

    @Id
    @GeneratedValue
    Long id;

    String name;

    @OneToOne
    @JoinColumn(name = "gender")
    Gender gender;
}
