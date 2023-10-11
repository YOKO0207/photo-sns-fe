import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { AnchorHTMLAttributes } from "react";
import {
	ColorProps,
	SpaceProps,
	space,
	color,
	compose,
	TypographyProps,
	typography,
} from "styled-system";
import systemCss, { CSSProperties } from "@styled-system/css";
import { removeLastSegment } from "@/libs/utils";
import styled from "styled-components";

interface Props extends SpaceProps, ColorProps, TypographyProps {
	href: string;
	query?: { [key: string]: any };
	currentPathStyle?: CSSProperties;
}

export const Link: React.FC<
	Props & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ href, query, children, currentPathStyle, ...props }) => {
	let { pathname } = useRouter();

	const checkRouteMatch = () => {
		if (href === "/") return pathname === href;
		return removeLastSegment(pathname) == removeLastSegment(href);
	};

	return (
		<StyledLink
			href={{ pathname: href, query }}
			style={checkRouteMatch() ? currentPathStyle : {}}
			{...props}
		>
			{children}
		</StyledLink>
	);
};

const StyledLink = styled(NextLink)<SpaceProps & ColorProps>(
	({ style }) =>
		systemCss({
			position: "relative",
			transition: "all 150ms ease-in-out",
			"&.underline": {
				textDecoration: "underline",
			},
			"&:hover": {
				textDecoration: "none",
				opacity: 0.7,
			},
			...style,
		}),
	compose(space, color, typography)
);
