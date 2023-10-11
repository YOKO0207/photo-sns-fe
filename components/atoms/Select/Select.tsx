import { Box, Error, Label } from "@/components/atoms";
import { colors } from "@/styles";
import systemCss from "@styled-system/css";
import { Field } from "formik";
import { FC, ReactNode, SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { TypographyProps, variant } from "styled-system";

interface Props extends TypographyProps {
	name: string;
	label?: string;
	variant?: "outlined" | "filled";
	children: ReactNode;
	color?: string;
	fontSize?: string;
	errorText?: string;
}

interface StyledSelectProps {
	variant?: "outlined" | "filled";
}

export const Select: FC<Props & SelectHTMLAttributes<HTMLSelectElement>> = (
	props
) => {
	const {
		name,
		label,
		variant,
		children,
		color,
		fontSize,
		errorText,
		...rest
	} = props;
	return (
		<StyledBox display="flex" flexDirection="column" variant={variant}>
			{label && (
				<Label mb={1} color={color} fontSize={fontSize}>
					{label}
				</Label>
			)}
			<StyledSelect as="select" name={name} variant={variant} {...rest}>
				{children}
			</StyledSelect>
			{errorText && <Error mt="2px">{errorText}</Error>}
		</StyledBox>
	);
};

const StyledSelect = styled(Field)<StyledSelectProps>(
	({}) =>
		systemCss({
			outline: "none",
		}),
	({}) =>
		variant({
			prop: "variant",
			variants: {
				outlined: {
					background: "unset",
					border: "none",
				},
				filled: {
					borderColor: colors.gray[210],
					padding: "8px 4px",
					borderRadius: "4px",
				},
			},
		})
);

const StyledBox = styled(Box)<StyledSelectProps>(
	variant({
		prop: "variant",
		variants: {
			outlined: {
				borderBottom: `1px solid ${colors.gray[150]}`,
				paddingBottom: "8px",
			},
			filled: {},
		},
	})
);
