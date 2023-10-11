import styled from "styled-components";
import {
	border,
	BorderProps,
	layout,
	LayoutProps,
	space,
	SpaceProps,
	position,
	PositionProps,
} from "styled-system";

export const Image = styled.img<
	SpaceProps & BorderProps & LayoutProps & PositionProps
>`
	${space}
	${border}
  ${layout}
  ${position}
`;


