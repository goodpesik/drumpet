import { Action } from '@ngrx/store';
import { InstaPost } from '../../models/data.model';

export enum ActionTypes {
	LOAD_REQUEST = '[Photos] Load Request',
	LOAD_FAILURE = '[Photos] Load Failure',
	LOAD_SUCCESS = '[Photos] Load Success'
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
	constructor(public payload: { items: InstaPost[] }) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;