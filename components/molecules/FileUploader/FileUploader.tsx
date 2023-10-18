import { Error, Typography } from "@/components/atoms";
import { FC, useEffect, useRef, useState } from "react";
import { FileUploader as FileDragAndDrop } from "react-drag-drop-files";
import { SpaceProps } from "styled-system";

interface Props extends SpaceProps {
	note?: string;
	name: string;
	errorText?: string[] | string;
	onChange: (file: File) => void;
}

export const FileUploader: FC<Props> = (props) => {
	const { note, name, errorText, onChange, ...rest } = props;
	const [fileName, setFileName] = useState("");

	const handleChange = (file: File) => {
		setFileName(file.name);
		onChange(file);
	};

	// To change the default text after uploading a file
	// TODO consider if this is the best way to do this
	const uploaderRef = useRef();
	useEffect(() => {
		const elements = document.querySelectorAll("span");
		const targetText = "Uploaded Successfully! Upload another?";
		const changeText = " ";
		elements.forEach((element) => {
			if (element.textContent === targetText) {
				element.textContent = changeText;
			}
		});
	}, [fileName]);

	return (
		<>
			<FileDragAndDrop
				ref={uploaderRef}
				handleChange={handleChange}
				name={name}
				classes={"file-drag-and-drop"}
				label=" "
				hoverTitle="ドロップ"
				multiple={false}
			/>
			{fileName && (
				<Typography fontSize={"12px"} color="gray.500" mt="8px">
					{fileName}
				</Typography>
			)}
			{note && (
				<Typography fontSize={"12px"} color="gray.500">
					{note}
				</Typography>
			)}
			{errorText && <Error mt="2px">{errorText}</Error>}
		</>
	);
};
