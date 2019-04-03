import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EventsStoreEffect } from './effect';
import { EventsReducer } from './reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('events', EventsReducer),
		EffectsModule.forFeature([EventsStoreEffect])
	],
	providers: [EventsStoreEffect]
})
export class EventsStoreModule {}
