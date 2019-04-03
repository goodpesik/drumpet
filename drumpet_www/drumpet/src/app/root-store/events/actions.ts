import { Action } from '@ngrx/store';
import { Event } from '../../models/data.model';

export enum ActionTypes {
	LOAD_REQUEST = '[Events] Load Request',
	LOAD_FAILURE = '[Events] Load Failure',
	LOAD_SUCCESS = '[Events] Load Success'
}

export class LoadRequestAction implements Action {
	readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
	readonly type = ActionTypes.LOAD_FAILURE;
	constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
	readonly type = ActionTypes.LOAD_SUCCESS;
	constructor(public payload: { items: Event[] }) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;