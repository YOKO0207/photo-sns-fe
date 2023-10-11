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
} from "styled-system";

interface Props
	extends LayoutProps,
		ColorProps,
		PositionProps,
		SpaceProps,
		FlexProps,
		BorderProps,
		FlexboxProps,
		TypographyProps {
	shadow?: number;
	cursor?: string;
	transition?: string;
}

export const Box = styled.div<Props>(
	compose(layout, space, color, position, flexbox, flex, border, typography)
);
