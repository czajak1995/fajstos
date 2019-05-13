import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { 
  MatGridListModule,
  MatIconModule,
  MatCardModule
} from '@angular/material'
import { AudioService } from './audio/audio.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    // Material
    MatGridListModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [ AudioService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
