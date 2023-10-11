import { removeLastSegment } from "@/libs/utils";
import systemCss, { CSSProperties } from "@styled-system/css";
import { useRouter } from "next/router";
import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";
import { ColorProps, SpaceProps, color, compose, space } from "styled-system";

interface Props extends SpaceProps, ColorProps {
	href: string;
	className?: string;
	currentPathStyle?: CSSProperties;
}

export const LinkAction: React.FC<
	Props & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ href, children, className, currentPathStyle, ...props }) => {
	let { pathname } = useRouter();

	const checkRouteMatch = () => {
		if (href === "/") return pathname === href;
		return removeLastSegment(pathname) == removeLastSegment(href);
	};

	return (
		<StyledLink
			className={className}
			style={checkRouteMatch() ? currentPathStyle : {}}
			{...props}
		>
			{children}
		</StyledLink>
	);
};

export const StyledLink = styled.a<SpaceProps & ColorProps>(
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
			"& svg path": {},
			"& svg polyline, svg polygon": {},
			cursor: "pointer",
			...style,
		}),
	compose(space, color)
);
