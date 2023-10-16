import { Box } from "@/components/atoms";
import { sizeOptions } from "@/types";
import { FC } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

interface Props {
	name: string;
	size: Exclude<sizeOptions, "xl">;
}
export const Alphabetavatar: FC<Props> = (props) => {
	const { name, size } = props;

	return (
		<StyledBox
			borderRadius="50%"
			bg="secondary.500"
			color="gray.white"
			display="flex"
			justifyContent="center"
			alignItems="center"
			size={size}
		>
			{name}
		</StyledBox>
	);
};

const StyledBox = styled(Box)(
	variant({
		prop: "size",
		variants: {
			sm: {
				width: "24px",
				height: "24px",
				fontSize: "12px",
			},
			md: {
				width: "32px",
				height: "32px",
				fontSize: "16px",
			},
			lg: {
				width: "40px",
				height: "40px",
				fontSize: "20px",
			},
			xl: {
				width: "48px",
				height: "48px",
				fontSize: "24px",
			},
		},
	})
);
