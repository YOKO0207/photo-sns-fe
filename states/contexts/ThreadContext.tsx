import React, { createContext, useContext, useMemo, useReducer } from "react";
import {
	threadInitialState,
	threadActionType,
	threadReducer,
} from "@/states/reducers";

type AppProps = {
	children: React.ReactNode;
};

const ThreadContext: any = createContext(null);

export const ThreadProvider = (props: AppProps) => {
	const [state, dispatch] = useReducer(threadReducer, threadInitialState);

	const contextValue: any = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return (
		<ThreadContext.Provider value={contextValue}>
			{props.children}
		</ThreadContext.Provider>
	);
};

export const useThreadContext = () =>
	useContext<{
		state: typeof threadInitialState;
		dispatch: (args: threadActionType) => void;
	}>(ThreadContext);

export default ThreadContext;
