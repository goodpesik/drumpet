import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { InstaPost } from '../../models/data.model';
import { State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;

const getPhotos = (state: State): any => {
	return state.data;
};
export const selectPhotosState: MemoizedSelector<object,State> = createFeatureSelector<State>('photos');
export const selectPhotos: MemoizedSelector<object,InstaPost[]> = createSelector(selectPhotosState, getPhotos);
export const selectPhotosError: MemoizedSelector<object, any> = createSelector(
	selectPhotosState,
	getError
);
export const selectMyFeatureIsLoading: MemoizedSelector<object,boolean> = createSelector(selectPhotosState, getIsLoading);