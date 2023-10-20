export const threadInitialState = {
	threadOpen: false,
};

export type threadStateType = typeof threadInitialState;
export type threadActionType = 
	| {
		type: 'SET_THREAD_OPEN';
	}
	| {
		type: 'SET_THREAD_CLOSED';
	}


export const threadReducer = (
	state: threadStateType,
	action: threadActionType
) => {
	switch (action.type) {
		case 'SET_THREAD_OPEN':
			return {
				...state,
				threadOpen: true,
			};
		case 'SET_THREAD_CLOSED':
			return {
				...state,
				threadOpen: false,
			};
		default:
			return state;
	}
}