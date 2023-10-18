import styled from "styled-components";
import {
	border,
	BorderProps,
	color,
	ColorProps,
	compose,
	flex,
	flexbox,
	FlexboxProps,
	FlexProps,
	layout,
	LayoutProps,
	position,
	PositionProps,
	space,
	SpaceProps,
	typography,
	TypographyProps,
	GridProps,
	grid
} from "styled-system";
import { style } from "styled-system";

interface Props {
	shadow?: string;
	cursor?: string;
	gap?: string | number;
}

const gap = style({
	prop: "gap",
	cssProperty: "gap",
});

const cursor = style({
	prop: "cursor",
	cssProperty: "cursor",
});

const shadow = style({
	prop: "shadow",
	key: "shadows",
	cssProperty: "boxShadow",
});

const customStyles = [gap, cursor, shadow];


export const Box = styled.div<
	Props &
		LayoutProps &
		ColorProps &
		PositionProps &
		SpaceProps &
		FlexProps &
		BorderProps &
		FlexboxProps &
		TypographyProps &
		GridProps
>(
	compose(
		layout,
		space,
		color,
		position,
		flexbox,
		flex,
		border,
		typography,
		grid,
		...customStyles
	)
);
