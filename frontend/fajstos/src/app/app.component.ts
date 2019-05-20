import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AudioService } from './audio/audio.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fajstos';
  glyphs : PhaistosGlyph[] = [];
  glyphNumbers : number = 45;
  glyphMappingPattern = "^[QqWwRrTtPpSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm][AaEeIiOoUu]$";
  fullText: string = "";
  mp3Notes: string[] = [];
  speaker: string = "dorota";
  speakers: string[] = [];
  glyphFormGroup: FormGroup;

  validation_messages = {
    'mapping': [
      { type: 'required', message: 'Mapping is required' },
      { type: 'minlength', message: 'Mapping must be at least 5 characters long' },
      { type: 'maxlength', message: 'Mapping cannot be more than 25 characters long' }
    ]
  }


  constructor(private _service: AudioService, public toastr: ToastrService) {
    for(var i=1; i<=this.glyphNumbers; i++) {
      if(i < 10) {
        this.glyphs.push(new PhaistosGlyph(i,"","assets/icons/Phaistos_glyph_0" + i + ".svg.png"));
      } else {
        this.glyphs.push(new PhaistosGlyph(i,"","assets/icons/Phaistos_glyph_" + i + ".svg.png"));
      }
    }

    this.glyphFormGroup = new FormGroup({
      mapping: new FormControl('mapping', [Validators.pattern(this.glyphMappingPattern)])
    })

    _service.getAllSpeakerNames().subscribe((data) => this.speakers = data)
  }

  public display(glyph : PhaistosGlyph) {
    console.log(glyph.mapping)
    if(glyph.mapping != "") {
      this.fullText = this.fullText + glyph.mapping;
      this.mp3Notes.push(glyph.mapping.toLowerCase())
    }
  }

  public record() {
    console.log(this.fullText)
    if(this.mp3Notes.length == 0) {
      this.toastr.error('Record cannot be empty', 'Error!');
      return;
    }
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

  public reset() {
    this.mp3Notes.length = 0;
    this.fullText = ""
  }

  public onSubmit() {
    if (this.glyphFormGroup.valid) {
      console.log('form submitted');
      this.record()
    } else {
      this.toastr.error('Glyph mapping must be in format [consonant][vovel]', 'Error!');
      this.validateAllFormFields(this.glyphFormGroup);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {       
  Object.keys(formGroup.controls).forEach(field => {  
    const control = formGroup.get(field);             
    if (control instanceof FormControl) {             
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    } else if (control instanceof FormGroup) {        
      this.validateAllFormFields(control);            
    }
  });
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