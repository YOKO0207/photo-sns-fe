import React, { CSSProperties }from "react";
import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flex,
  FlexProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

interface Props
  extends TypographyProps,
    SpaceProps,
    ColorProps,
    FlexProps,
    LayoutProps,
    BorderProps {
  ref?: any;
  as?: any;
  title?: string;
  className?: string;
  ellipsis?: boolean;
  textBreak?: boolean;
  style?: CSSProperties;
  onClick?: (e : any) => void;
  [key: string]: any;
}

export const Typography= styled.div<Props>`
	${(props) =>
		props.ellipsis
			? `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `
			: ""}

	${(props) =>
		props.textBreak
			? `
          white-space: break-spaces;
          word-wrap: break-word;
          overflow-wrap: break-word;
      `
			: ""}

  ${border}
  ${typography}
  ${space}
  ${color}
  ${flex}
  ${layout}
`;

export const H1: React.FC<Props> = (props) => (
	<Typography
		as="h1"
		mb="0"
		mt="0"
		fontWeight="300"
		fontSize="30px"
		{...props}
	/>
);
export const H2: React.FC<Props> = (props) => (
	<Typography
		as="h2"
		mb="0"
		mt="0"
		fontWeight="300"
		fontSize="25px"
		{...props}
	/>
);
export const H3: React.FC<Props> = (props) => (
	<Typography
		as="h3"
		mb="0"
		mt="0"
		fontWeight="300"
		fontSize="20px"
		{...props}
	/>
);
export const H4: React.FC<Props> = (props) => (
  <Typography
    as="h4"
    mb="0"
    mt="0"
    fontWeight="300"
    fontSize="18px"
    {...props}
  />
);
export const H5: React.FC<Props> = (props) => (
  <Typography
    as="h5"
    mb="0"
    mt="0"
    fontWeight="300"
    fontSize="16px"
    {...props}
  />
);
export const H6: React.FC<Props> = (props) => (
  <Typography
    as="h6"
    mb="0"
    mt="0"
    fontWeight="300"
    fontSize="14px"
    {...props}
  />
);

export const MParagraph: React.FC<Props> = (props) => (
	<Typography
		as="p"
		mb="0"
		mt="0"
		fontWeight="300"
		fontSize="16px"
		{...props}
	/>
);
export const SParagraph: React.FC<Props> = (props) => (
	<Typography
		as="p"
		mb="0"
		mt="0"
		fontWeight="300"
		fontSize="14px"
		{...props}
	/>
);
export const XSParagraph: React.FC<Props> = (props) => (
	<Typography
		as="p"
		mb="0"
		mt="0"
		fontWeight="300"
		fontSize="12px"
		{...props}
	/>
);

export const LSpan: React.FC<Props> = (props) => (
	<Typography as="span" fontSize="16px" {...props} />
);
export const MSpan: React.FC<Props> = (props) => (
	<Typography as="span" fontSize="14px" {...props} />
);
export const SSpan: React.FC<Props> = (props) => (
	<Typography as="span" fontSize="12px" {...props} />
);
export const XSSpan: React.FC<Props> = (props) => (
	<Typography as="span" fontSize="10px" {...props} />
);

export const Label: React.FC<Props> = (props) => (
	<Typography as="label" fontSize="14px" fontWeight="300" {...props} />
);
export const Error: React.FC<Props> = (props) => (
	<Typography as="p" fontSize="14px" color="error.500" {...props} />
);

