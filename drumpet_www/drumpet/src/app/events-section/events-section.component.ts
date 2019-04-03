import { Component, OnInit } from '@angular/core';
import { Event } from '../models/data.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
	RootStoreState,
	EventsStoreActions,
	EventsStoreSelectors
  } from '../root-store';

@Component({
	selector: 'app-events-section',
	templateUrl: './events-section.component.html',
	styleUrls: ['./events-section.component.scss']
})
export class EventsSectionComponent implements OnInit {
	events: Event[];
	today: Date = new Date();
	isDisplayAll: boolean = false;
	eventsShowLimit: number = 3;
	eventsShowStep: number = 3;
	hideButton: boolean;
	isLoading: boolean;

	private _unsubscribe$ = new Subject();
	private events$: Observable<Event[]> = this.store$.select(
		EventsStoreSelectors.selectEvents
	).pipe(takeUntil(this._unsubscribe$));
	private isLoading$: Observable<boolean> = this.store$.select(
		EventsStoreSelectors.selectMyFeatureIsLoading
	).pipe(takeUntil(this._unsubscribe$));

	constructor(
		private store$: Store<RootStoreState.State>
	) { }

	ngOnInit() {
		this.store$.dispatch(
			new EventsStoreActions.LoadRequestAction()
		);

		this.isLoading$.subscribe(isLoading => {
			  this.isLoading = isLoading;
		});

		this.events$.subscribe(events => {
			if(events) {
				let index = 0;
				events.forEach(event => {
					if (new Date(event.date) < this.today) {
						events[index].isOutdated = true;
					}
					index++;
				});
				this.events = events;
			}
		});
	}

	public showMore(): void {
		this.eventsShowLimit += this.eventsShowStep;
		this.checkShowMoreButtonState();
	}

	public checkShowMoreButtonState(): void {
		if (!this.isDisplayAll) {
			let futureEvents = this.events.filter(event => !event.isOutdated);
			this.hideButton = this.eventsShowLimit >= futureEvents.length ? true : false;
			
		} else {
			this.hideButton = this.eventsShowLimit >= this.events.length ? true : false;
		}
	}
}
