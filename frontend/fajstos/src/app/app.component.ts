import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AudioService } from './audio/audio.service';
import { saveAs } from 'file-saver';

export const BASE_URL: string = "http://localhost:8080/audio";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fajstos';
  glyphs : PhaistosGlyph[] = [];
  imgUrlTemplate: string = "assets/icons/Phaistos_glyph_{{number}}.svg.png";
  glyphNumbers : number = 16;
  glyphMappingPatter = "^[qwrtpsdfghjklzxcvbnm][aeiouy]$";
  fullText: string = "";
  mp3Notes: string[] = [];
  speaker: string = "dorota";
  speakers: string[] = [];

  validation_messages = {
    'mapping': [
      { type: 'required', message: 'Mapping is required' },
      { type: 'minlength', message: 'Mapping must be at least 5 characters long' },
      { type: 'maxlength', message: 'Mapping cannot be more than 25 characters long' }
    ]
  }

  glyphFormGroup = new FormGroup({
    mapping: new FormControl('mapping', Validators.required)
  })

  constructor(private _service: AudioService) {
    for(var i=1; i<this.glyphNumbers; i++) {
      if(i < 10) {
        this.glyphs.push(new PhaistosGlyph(i,"","assets/icons/Phaistos_glyph_0" + i + ".svg.png"));
      } else {
        this.glyphs.push(new PhaistosGlyph(i,"","assets/icons/Phaistos_glyph_" + i + ".svg.png"));
      }
    }

    _service.getAllSpeakerNames().subscribe((data) => this.speakers = data)
  }

  public display(glyph : PhaistosGlyph) {
    console.log(glyph.mapping)
    if(glyph.mapping != "") {
      this.fullText = this.fullText + glyph.mapping;
      this.mp3Notes.push(glyph.mapping)
    }
  }

  public record() {
    console.log(this.fullText)
    var preparedNotes = this.mp3Notes.join(",")
    console.log(preparedNotes)
    this._service.getMergedAudio(preparedNotes, this.speaker).subscribe(
      (data) => {
        if(data) {
            const myBlob: Blob = new Blob([(<any>data)]);
            var currentTime = new Date();
            saveAs(myBlob, 'audio_' + this.speaker + currentTime.getHours() + "_" + currentTime.getMinutes() + '.mp3');
        }
    }, 
    (err) => {
        console.log("Can't download mp3 file")
    }
    )
  }
}

class PhaistosGlyph {
  id: number;
  mapping: string;
  imgUrl: string;

  constructor(id: number, mapping: string, imgUrl: string) {
    this.id = id;
    this.mapping = mapping;
    this.imgUrl = imgUrl;
  }
}