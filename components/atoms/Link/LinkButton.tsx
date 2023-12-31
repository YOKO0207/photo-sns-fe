import systemCss from "@styled-system/css";
import { colorOptions, sizeOptions } from "@/types";
import styled from "styled-components";
import {
	BackgroundProps,
	border,
	BorderProps,
	color,
	ColorProps,
	compose,
	layout,
	LayoutProps,
	shadow,
	ShadowProps,
	space,
	SpaceProps,
	variant,
} from "styled-system";
import { FC } from "react";
import { AnchorHTMLAttributes } from "react";
import NextLink from "next/link";

interface StyleProps
	extends ColorProps,
		BackgroundProps,
		BorderProps,
		SpaceProps,
		LayoutProps,
		ShadowProps {
	size?: Exclude<sizeOptions, "xl">;
	color?: colorOptions;
	variant?: "text" | "outlined" | "contained";
	fullwidth?: boolean;
}

interface Props {
	href: string;
	query?: { [key: string]: any };
} 

export const LinkButton: FC<
	StyleProps & Props & AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
	const { href, query, children, ...rest } = props;
	return (
		<StyledLinkButton href={{ pathname: href, query }} {...rest}>
			{children}
		</StyledLinkButton>
	);
};

const StyledLinkButton = styled(NextLink)<StyleProps>(
	({ color, fullwidth }) =>
		systemCss({
			display: "flex",
			width: fullwidth ? "100%" : "unset",
			justifyContent: "center",
			alignItems: "center",
			outline: "none",
			border: "none",
			borderRadius: "20px",
			cursor: "pointer",
			fontSize: "1rem",
			fontWeight: 600,
			fontFamily: "inherit",
			color: color ? `${color}.main` : "body.text",
			background: "transparent",
			transition: "all 150ms ease-in-out",
			lineHeight: 1,
			"&:disabled": {
				opacity: 0.5,
			},
		}),
	({ color = "#000" }) =>
		variant({
			prop: "variant",
			variants: {
				text: {
					border: "none",
					color: `${color}.main`,
					"&:hover": {
						bg: color ? `${color}.100` : "gray.100",
					},
				},
				outlined: {
					padding: "10px 16px",
					color: `${color}.500`,
					border: "1px solid",
					borderColor: color ? `${color}.500` : "red",
					"&:hover": {
						opacity: 0.6,
					},
				},
				contained: {
					border: "none",
					color: `gray.white`,
					bg: `${color}.500`,
					fontWeight: 400,
				},
			},
		}),
	variant({
		prop: "size",
		variants: {
			lg: {
				height: "56px",
				px: 30,
				fontSize: 14,
			},
			md: {
				height: "40px",
				px: 30,
				fontSize: 16,
			},
			sm: {
				height: "32px",
				fontSize: 14,
				px: 3,
				py: 1,
			},
			xs: {
				height: "24px",
				fontSize: 14,
				padding: "4px 0.7rem",
			},
		},
	}),
	compose(color, layout, space, border, shadow)
);