import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PhotosStoreModule } from './photos/photos.module';
import { EventsStoreModule } from './events/events.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		PhotosStoreModule,
		EventsStoreModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([])
	]
})
export class RootStoreModule { }
