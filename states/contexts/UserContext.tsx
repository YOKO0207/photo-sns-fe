import React, { createContext, useContext, useMemo, useReducer } from "react";
import {
	userInitialState,
	userActionType,
	userReducer,
} from "@/states/reducers";

type AppProps = {
	children: React.ReactNode;
};

const UserContext: any = createContext(null);

export const UserProvider = (props: AppProps) => {
	const [state, dispatch] = useReducer(userReducer, userInitialState);

	const contextValue: any = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return (
		<UserContext.Provider value={contextValue}>
			{props.children}
		</UserContext.Provider>
	);
};

export const useUserContext = () =>
	useContext<{
		state: typeof userInitialState;
		dispatch: (args: userActionType) => void;
	}>(UserContext);

export default UserContext;
