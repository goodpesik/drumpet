import { InstaPost } from '../../models/data.model';

export interface State {
	data?: InstaPost[];
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = {
	data: [],
	isLoading: false,
	error: null
}