import ErrorPage from "@/pages/_error";
import { ErrorResponse } from "@/types";
import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps {
	error: ErrorResponse | string;
}

interface AppErrorBoundaryProps {
	children: ReactNode;
}

const ErrorFallback: FC<ErrorFallbackProps> = (props) => {
	const { error } = props;
	return <ErrorPage error={error} />;
};

export const AppErrorBoundary: FC<AppErrorBoundaryProps> = (props) => {
	const { children } = props;
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
	);
};
