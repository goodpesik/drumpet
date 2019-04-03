import { PhotosStoreState } from './photos';
import { EventsStoreState } from './events';

export interface State {
	photos: PhotosStoreState.State,
	events: EventsStoreState.State
}
