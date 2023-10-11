import styled from "styled-components";
import {
	BorderProps,
	ColorProps,
	GridProps,
	LayoutProps,
	PositionProps,
	SpaceProps,
	border,
	color,
	compose,
	grid,
	layout,
	position,
	space,
} from "styled-system";

interface Props
	extends LayoutProps,
		ColorProps,
		PositionProps,
		SpaceProps,
		BorderProps,
		GridProps {
	shadow?: number;
	cursor?: string;
	transition?: string;
}

export const Grid = styled.div<Props>(
	compose(layout, space, color, position, border, grid)
);
