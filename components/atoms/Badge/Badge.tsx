import systemCss from "@styled-system/css";
import styled from "styled-components";
import { variant } from "styled-system";
import { colorOptions } from "@/types";

interface Props {
	color?: colorOptions;
	size?: "sm" | "md" | "lg";
}

export const Badge = styled.div<Props>(
	({ color }) =>
		systemCss({
			display: "inline-block",
			px: "10px",
			py: "5px",
			borderRadius: "5px",
			backgroundColor: `${color}.200`,
			color: `${color}.500`,
			fontWeight: 500,
		}),
	variant({
		prop: "size",
		variants: {
			sm: {
				fontSize: "14px",
			},
			md: {
				fontSize: "15px",
			},
			lg: {
				fontSize: "16px",
			},
		},
	})
);
