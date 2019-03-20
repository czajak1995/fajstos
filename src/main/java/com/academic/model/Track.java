package com.academic.model;

import org.springframework.core.io.InputStreamResource;

public class Track {

    String name;
    String path;
    InputStreamResource streamResource;

    public Track(String name, String path) {
        this.name = name;
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public String getPath() {
        return path;
    }

    public InputStreamResource getStreamResource() {
        return streamResource;
    }

    public void setStreamResource(InputStreamResource streamResource) {
        this.streamResource = streamResource;
    }
}
