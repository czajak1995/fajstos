import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  BASE_URL : string = "http://localhost:8080/audio";

  constructor(private http: HttpClient) { }

  getMergedAudio(mp3Notes: string, speaker: string) {
    return this.http.get(BASE_URL + "/merge?track_names=" + mp3Notes + "&speaker=" + speaker, { responseType: 'blob'})
  }

  getAllSpeakerNames(): Observable<string[]> {
    return this.http.get<string[]>(BASE_URL + "/speakers")
  }
}
