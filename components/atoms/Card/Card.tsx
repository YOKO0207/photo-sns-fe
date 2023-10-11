import { colors } from "@/styles";
import { Box } from "@/components/atoms";
import styled from "styled-components";
import {
	border,
	BorderProps,
	color,
	ColorProps,
	layout,
	LayoutProps,
	space,
	SpaceProps,
} from "styled-system";

interface Props extends ColorProps, SpaceProps, LayoutProps, BorderProps {
	elevation?: number;
	boxShadow?: number;
	hoverEffect?: boolean;
}

export const Card = styled(Box)<Props>`
	background-color: ${colors.gray[200]};

	${border}
	${color}
  ${space}
  ${layout}
`;

Card.defaultProps = {
	boxShadow: 10,
	borderRadius: 5,
	hoverEffect: false,
};

export default Card;
