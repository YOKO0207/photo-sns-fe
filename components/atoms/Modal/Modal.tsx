import MaterialModal from "@mui/material/Modal";
import { FC, ReactElement, useState } from "react";

interface Props {
	children: ReactElement;
	open: boolean;
}

export const Modal: FC<Props> = (props) => {
	const { children, open } = props;

	return (
		<div>
			<MaterialModal
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{children}
			</MaterialModal>
		</div>
	);
};
