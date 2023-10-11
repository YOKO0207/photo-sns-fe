import { Box } from "@/components/atoms";
import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

interface Props {
	color?: string;
	size: number;
}

export const Spinner: FC<Props> = (props) => {
	const { color, size } = props;

	return (
		<Box color={color}>
			<CircularProgress color="inherit" size={size} />
		</Box>
	);
};
