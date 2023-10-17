import systemCss from "@styled-system/css";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { color, compose, space, SpaceProps } from "styled-system";
import { TextFieldProps } from "./TextField";

export const SyledTextField = styled.input<
	InputHTMLAttributes<HTMLInputElement> & TextFieldProps
>(
	(props) =>
		systemCss({
			padding: "8px 12px",
			height: "40px",
			fontSize: "14px",
			color: "gray.900",
			borderRadius: props.borderRadius ? props.borderRadius : 3,
			border: "1px solid",
			borderColor: "gray.200",
			width: props.fullwidth ? "100%" : "inherit",
			outline: "none",
			fontFamily: "inherit",
			fontWeight: "400",
			// "&:hover": {
			// 	borderColor: "gray.220",
			// },
			"&:disabled": {
				color: "gray.450",
			},
			"&:focus": {
				border: "2px solid",
				borderColor: "primary.200",
			},
		}),
	compose(color)
);

export const TextFieldWrapper = styled.div<TextFieldProps & SpaceProps>(
	(props) =>
		systemCss({
			position: "relative",
			width: props.fullwidth ? "100%" : "inherit",
			label: {
				display: "block",
				marginBottom: "6px",
				fontSize: "14px",
			},

			small: {
				display: "block",
				color: "error.500",
				marginTop: "0.25rem",
				marginLeft: "0.25rem",
				textAlign: "left",
			},

			".top-adornment": {
				position: "absolute",
				top: "-15px",
				transform: "translateY(-50%)",
				right: "0.25rem",
			},

			".end-adornment": {
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				right: "0.25rem",
			},

			".start-adornment": {
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				left: "0.5rem",
			},
			".start-adornment + input": {
				paddingLeft: "35px",
			},
		}),
	compose(color, space)
);
