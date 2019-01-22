import { Component, OnInit } from '@angular/core';
import { InstaPost } from '../insta-post';
import { DataService } from '../data.service';

@Component({
	selector: 'app-photos-section',
	templateUrl: './photos-section.component.html',
	styleUrls: ['./photos-section.component.scss']
})
export class PhotosSectionComponent implements OnInit {
	photos: InstaPost[];

	constructor(
		private dataService: DataService
	) { }

	ngOnInit() {
		this.getPhotos();
	}

	private getPhotos(): void {
		this.dataService.getPhotos()
		.subscribe(photos => this.photos = photos);
	}

}
