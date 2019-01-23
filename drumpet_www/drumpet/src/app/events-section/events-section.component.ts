import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event';
import { log } from 'util';

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

	constructor(
		private dataService: DataService
	) { }

	ngOnInit() {
		this.getEvents()
	}

	private getEvents(): void {
		this.dataService.getEvents()
		.subscribe(events => {
			let index = 0;
			events.forEach(event => {
				if (new Date(event.date) < this.today) {
					events[index].isOutdated = true;
				}
				index++;
			});
			this.events = events;
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
