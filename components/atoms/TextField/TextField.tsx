import { cloneElement, InputHTMLAttributes, useEffect, useState } from "react";
import { SpaceProps } from "styled-system";
import { colorOptions } from "@/types";
import { Label, Typography, Box } from "@/components/atoms";
import { SyledTextField, TextFieldWrapper } from "./TextFieldStyle";

export interface TextFieldProps extends SpaceProps {
	labelColor?: colorOptions;
	label?: string;
	type?: string;
	getValue?: any;
	errorText?: any;
	id?: any;
	fullwidth?: boolean;
	endAdornment?: any;
	startAdornment?: any;
	showLength?: boolean;
	disabled?: boolean;
	placeholder?: string;
	borderRadius?: number;
	note?: string;
}

export const TextField: React.FC<
	InputHTMLAttributes<HTMLInputElement> & TextFieldProps
> = ({
	id,
	label,
	getValue,
	errorText,
	labelColor,
	endAdornment,
	startAdornment,
	showLength,
	note,
	...props
}) => {
	const [textId, setTextId] = useState(id);

	// extract spacing props
	let spacingProps: any = {};
	for (const key in props) {
		if (key.startsWith("m") || key.startsWith("p"))
			spacingProps[key as keyof typeof spacingProps] =
				props[key as keyof typeof props];
	}

	useEffect(() => {
		if (!id) setTextId(Math.random());
	}, []);

	const [valueLength, setValueLength] = useState(0);

	useEffect(() => {
		if (showLength && getValue) {
			setValueLength(getValue?.length || 0);
		}
	}, [showLength, getValue]);

	return (
		<TextFieldWrapper
			color={labelColor && `${labelColor}.main`}
			fullwidth={props.fullwidth}
			{...spacingProps}
		>
			{label && (
				<Label textAlign="left" htmlFor={textId}>
					{label}
				</Label>
			)}
			<Box position="relative">
				{startAdornment &&
					cloneElement(startAdornment, {
						className: `start-adornment ${startAdornment.className}`,
					})}

				<SyledTextField id={textId} {...props} />
				{showLength && (
					<Typography fontSize="12px" className="top-adornment">
						{valueLength}文字
					</Typography>
				)}
				{endAdornment &&
					cloneElement(endAdornment, {
						className: `end-adornment ${endAdornment.className}`,
					})}
			</Box>
			{note && (
				<Typography color="gray.600" mt="5px">
					{note}
				</Typography>
			)}
			{errorText && <small>{errorText}</small>}
		</TextFieldWrapper>
	);
};

TextField.defaultProps = {
	color: "default",
	showLength: false,
};
