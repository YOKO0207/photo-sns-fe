import { Box } from "@/components/atoms";
import { FC, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const GuestLayout: FC<Props> = (props) => {
	const { children } = props;
	return (
		<Box
			display="flex"
			flexDirection="column"
			minHeight="100vh"
			alignItems="center"
			justifyContent="center"
		>
			{children}
		</Box>
	);
};
