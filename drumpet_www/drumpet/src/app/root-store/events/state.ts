import { Event } from '../../models/data.model';

export interface State {
	data?: Event[];
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = {
	data: [],
	isLoading: false,
	error: null
}