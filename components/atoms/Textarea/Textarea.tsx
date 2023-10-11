import { Box, Label, Error } from "@/components/atoms";
import { FC, TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "@/styles";
import { SpaceProps, space } from "styled-system";

interface Props extends SpaceProps {
	label?: string;
	defaultValue?: string;
	name: string;
	errorText?: string;
}

export const Textarea: FC<
	Props & TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
	const { label, errorText, mb, ...rest } = props;

	return (
		<Box display="flex" flexDirection="column" mb={mb}>
			{label && <Label mb={2}>{label}</Label>}
			<ContentInput {...rest} />
			{errorText && <Error mt="2px">{errorText}</Error>}
		</Box>
	);
};

const ContentInput = styled.textarea`
	backgroundcolor: ${colors.gray.white};
	border: 1px solid ${colors.gray[120]};
	borderradius: 5px;
	padding: 14px 12px;
	resize: none;
	fontsize: 14px;
`;
