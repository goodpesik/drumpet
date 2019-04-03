import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { Event } from '../../models/data.model';
import { State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;

const getEvents = (state: State): any => {
	return state.data;
};
export const selectEventsState: MemoizedSelector<object,State> = createFeatureSelector<State>('events');
export const selectEvents: MemoizedSelector<object,Event[]> = createSelector(selectEventsState, getEvents);
export const selectEventsError: MemoizedSelector<object, any> = createSelector(
	selectEventsState,
	getError
);
export const selectMyFeatureIsLoading: MemoizedSelector<object,boolean> = createSelector(selectEventsState, getIsLoading);