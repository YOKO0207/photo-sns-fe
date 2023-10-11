import { Box, MSpan } from "@/components/atoms";
import { FC } from "react";

interface Props {
	children?: string;
}

export const Divibar: FC<Props> = (props) => {
	const { children } = props;
	return (
		<>
			<Box display="flex" alignItems="center" mb="24px">
				<Box height="1px" bg="gray.500" width="100%" />
				{
					children && (
						<MSpan color="gray.500" width="60%">
						{children}
					</MSpan>
					)
				}
				<Box height="1px" bg="gray.500" width="100%" />
			</Box>
		</>
	);
}