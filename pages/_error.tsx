import { ErrorCard } from "@/components/organisms";
import { ErrorResponse } from "@/types";
import { NextPage } from "next";

interface Props {
	error?: ErrorResponse | string;
}

const ErrorPage: NextPage<Props> = (props) => {
	const { error } = props;

	if (typeof error === "string") {
		return <ErrorCard errorCode={400} errorMessage={error} />;
	} else {
		return (
			<>
				<ErrorCard
					errorCode={error?.status || 500}
					errorMessage={error?.data?.message}
				/>
			</>
		);
	}
};

export default ErrorPage;
