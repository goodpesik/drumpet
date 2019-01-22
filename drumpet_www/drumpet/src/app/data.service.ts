import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { InstaPost } from '../app/insta-post';
import { Event } from '../app/event';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	private photosUrl = 'http://localhost:8081/instaFeed';
	private eventsUrl = 'http://localhost:8081/events';
	private headers: Headers;

	constructor(private http: HttpClient) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append('Accept', 'application/json');
		this.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
		this.headers.append('Access-Control-Allow-Origin', '*');
	}

	getPhotos (): Observable<InstaPost[]> {
		return this.http.get<InstaPost[]>(this.photosUrl)
		.pipe(
			catchError(this.handleError('getPhotos', []))
		);
	}

	getEvents (): Observable<Event[]> {
		return this.http.get<Event[]>(this.eventsUrl)
		.pipe(
			catchError(this.handleError('getEvents', []))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		  console.error(error); 
		  return of(result as T);
		};
	  }
}
