import { User } from "@/types";

export const userInitialState: User = {
	id: 0,
	email: "",
	name: "",
	user_type: 0,
};

export type userStateType = typeof userInitialState;
export type userActionType = {
	type: "SET_USER_DATA" ;
	payload: User;
} | {
	type: "UNSET_USER_DATA";
};

export const userReducer = (
	state: userStateType,
	action: userActionType
) => {
	switch (action.type) {
		case "SET_USER_DATA":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
				name: action.payload.name,
				user_type: action.payload.user_type,
			};
		case "UNSET_USER_DATA":
			return {
				...state,
				...userInitialState,
			};
		default: return state;
	}
};
