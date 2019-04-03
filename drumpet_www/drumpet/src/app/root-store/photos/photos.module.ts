import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PhotosStoreEffect } from './effect';
import { PhotosReducer } from './reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('photos', PhotosReducer),
		EffectsModule.forFeature([PhotosStoreEffect])
	],
	providers: [PhotosStoreEffect]
})
export class PhotosStoreModule {}
