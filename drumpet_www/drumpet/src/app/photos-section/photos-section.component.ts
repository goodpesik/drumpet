import { Component, OnInit } from '@angular/core';
import { InstaPost } from '../models/data.model';
import { NguCarouselConfig } from '@ngu/carousel';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
	RootStoreState,
	PhotosStoreActions,
	PhotosStoreSelectors
  } from '../root-store';

@Component({
	selector: 'app-photos-section',
	templateUrl: './photos-section.component.html',
	styleUrls: ['./photos-section.component.scss']
})
export class PhotosSectionComponent implements OnInit {
	private _unsubscribe$ = new Subject();
	private photos$: Observable<InstaPost[]> = this.store$.select(
		PhotosStoreSelectors.selectPhotos
	).pipe(takeUntil(this._unsubscribe$));
	private isLoading$: Observable<boolean> = this.store$.select(
		PhotosStoreSelectors.selectMyFeatureIsLoading
	).pipe(takeUntil(this._unsubscribe$));

	photos: InstaPost[] = [];
	isLoading: boolean;

	public carouselTile: NguCarouselConfig = {
		grid: { xs: 1, sm: 1, md: 1, lg: 4, all: 0 },
		slide: 1,
		speed: 250,
		point: {
		  visible: true
		},
		load: 2,
		velocity: 0,
		touch: true,
		loop: true,
		easing: 'cubic-bezier(0, 0, 0.2, 1)'
	  };

	constructor(
		private store$: Store<RootStoreState.State>
	) { }

	ngOnInit() {
		this.store$.dispatch(
			new PhotosStoreActions.LoadRequestAction()
		);

		this.isLoading$.subscribe(isLoading => {
			  this.isLoading = isLoading;
		});

		this.photos$.subscribe(photos => {
			if (photos) {
				this.photos = photos;
			}
		})
	}
}
