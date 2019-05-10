package com.academic.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "genders")
public class Gender {

    @Id
    String name;

}
