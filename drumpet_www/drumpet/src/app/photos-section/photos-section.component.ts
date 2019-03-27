import { Component, OnInit } from '@angular/core';
import { InstaPost } from '../insta-post';
import { DataService } from '../data.service';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
	selector: 'app-photos-section',
	templateUrl: './photos-section.component.html',
	styleUrls: ['./photos-section.component.scss']
})
export class PhotosSectionComponent implements OnInit {
	photos: InstaPost[] = [];

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
		private dataService: DataService
	) { }

	ngOnInit() {
		this.getPhotos();
	}

	private getPhotos(): void {
		this.dataService.getPhotos()
		.subscribe(photos => {
			this.photos = photos;
		})
	}
}
