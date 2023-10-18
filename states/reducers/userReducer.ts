import { AppUser, User } from "@/types";

export const userInitialState: AppUser = {
	id: 0,
	email: "",
	name: "",
	isLoggedIn: false,
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
				isLoggedIn: true,
			};
		case "UNSET_USER_DATA":
			return {
				...state,
				...userInitialState,
			};
		default: return state;
	}
};
