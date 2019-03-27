import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient) { }

  getMergedAudio(mp3Notes: string, speaker: string) {
    return this.http.get("http://localhost:8080/audio" + "/merge?track_names=" + mp3Notes + "&speaker=" + speaker, { responseType: 'blob'})
  } 
}
