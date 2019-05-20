import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // BASE_URL : string = "https://localhost:8443/audio";
  BASE_URL : string = "https://ec2-35-173-193-111.compute-1.amazonaws.com:8443/audio";

  constructor(private http: HttpClient) { }

  getMergedAudio(mp3Notes: string, speaker: string) {
    return this.http.get(this.BASE_URL + "/merge?track_names=" + mp3Notes + "&speaker=" + speaker, { responseType: 'blob'})
  }

  getAllSpeakerNames(): Observable<string[]> {
    return this.http.get<string[]>(this.BASE_URL + "/speakers")
  }
}
