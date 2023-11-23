import { AppErrorBoundary, SWRConfig } from "@/components/organisms";
import { useMe } from "@/hooks";
import { UserProvider, useUserContext } from "@/states/contexts";
import { GlobalStyles, theme } from "@/styles";
import Head from "next/head";
import { FC, ReactElement, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

const App: FC = ({ Component, pageProps }: any) => {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta name="viewport" content="width=device-width, user-scalable=no" />
			</Head>
			<GlobalStyles />
			<AppErrorBoundary>
				<SWRConfig>
					<ToastContainer />
					<UserProvider>
						<AppWrapper>
							<Component {...pageProps} />
						</AppWrapper>
					</UserProvider>
				</SWRConfig>
			</AppErrorBoundary>
			</ThemeProvider>
	);
};

export default App;

interface AppWrapperProps {
	children: ReactElement;
}
const AppWrapper: FC<AppWrapperProps> = (props) => {
	const { children } = props;

	const { data } = useMe();
		const { dispatch } = useUserContext();

	useEffect(() => {
		if (data?.data?.data) {
			dispatch({ type: "SET_USER_DATA", payload: data.data.data });
		} else {
			dispatch({ type: "UNSET_USER_DATA" });
		}
	}, [data?.data?.data, dispatch]);
	
	return (<>{children}</>)
};
