import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PhotosSectionComponent } from './photos-section/photos-section.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsSectionComponent } from './events-section/events-section.component';
import { FilterEventsPipe } from './filter-events.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PhotosSectionComponent,
    EventsSectionComponent,
    FilterEventsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
