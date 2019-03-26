import { Component } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fajstos';
  glyphs :PhaistosGlyph[] = [];
  imgUrlTemplate: string = "assets/icons/Phaistos_glyph_{{number}}.svg.png";
  glyphNumbers : number = 16;

  constructor() {

    for(var i=1; i<this.glyphNumbers; i++) {
      if(i < 10) {
        this.glyphs.push(new PhaistosGlyph(i,"","assets/icons/Phaistos_glyph_0" + i + ".svg.png"));
      } else {
        this.glyphs.push(new PhaistosGlyph(i,"","assets/icons/Phaistos_glyph_" + i + ".svg.png"));
      }
    }


    // this.numbers = Array(16).fill(0).map(
    //   (x,i)=>
    //   {
    //     new PhaistosGlyph(i+1,"","");
    //   }
  }

  

  public display(elem : string) {
    console.log(elem)
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