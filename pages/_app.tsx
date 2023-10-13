import { AppErrorBoundary, SWRConfig } from "@/components/organisms";
import { UserProvider } from "@/states/contexts";
import { GlobalStyles, theme } from "@/styles";
import Head from "next/head";
import { FC } from "react";
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
						<Component {...pageProps} />
					</UserProvider>
				</SWRConfig>
			</AppErrorBoundary>
			</ThemeProvider>
	);
};

export default App;
