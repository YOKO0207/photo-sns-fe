import systemCss from "@styled-system/css";
import styled from "styled-components";
import { colorOptions } from "@/types";
import {
	BackgroundProps,
	border,
	BorderProps,
	color,
	ColorProps,
	compose,
	layout,
	shadow,
	space,
	SpaceProps,
	variant,
} from "styled-system";

interface Props extends ColorProps, BackgroundProps, BorderProps, SpaceProps {
	size: "small" | "medium" | "large" | "none";
	variant: "text" | "outlined" | "contained";
	color?: colorOptions;
}

export const IconButton = styled.button<Props>(
	systemCss({
		display: "flex",
		alignItems: "center",
		outline: "none",
		border: "none",
		cursor: "pointer",
		fontSize: "1rem",
		borderRadius: "50%",
		fontWeight: 600,
		color: "inherit",
		transition: "all 150ms ease-in-out",
		background: "none",
		"&:hover": {
			opacity: "0.8",
		},
		"&:disabled": {
			"&:hover": {
				opacity: "0.5",
			},
			opacity: 0.5,
			color: "text.muted",
			cursor: "not-allowed",
		},
	}),
	({ color }) =>
		variant({
			prop: "variant",
			variants: {
				text: {
					border: "none",
				},
				outlined: {
					color: `${color}.main`,
					border: "1.5px solid",
					borderColor: `${color}.main`,
					"&:focus": {
					},
				},
				contained: {
					color: `gray.white`,
					bg: `${color}.500`,
					"&:hover": {
						bg: `${color}.500`,
					},
					"&:focus": {
						boxShadow: `0px 1px 4px 0px ${color}.500`,
					},
				},
			},
		}),
	variant({
		prop: "size",
		variants: {
			large: {
				padding: "1.25rem",
			},
			medium: {
				padding: "1rem",
			},
			small: {
				padding: "6px",
			},
		},
	}),
	compose(color, layout, space, border, shadow)
);

IconButton.defaultProps = {
	size: "small",
};
