import { Modal, Box, Spinner } from "@/components/atoms"
import { FC } from "react";

interface Props {
	open: boolean;
}

export const ModalLoading: FC<Props> = (props) => {
	const { open } = props;
	return (
		<Modal open={open}>
			<Box
				display="flex"
				flexDirection="column"
				minHeight="100vh"
				alignItems="center"
				justifyContent="center"
				color="gray.120"
			>
				<Spinner size={40} />
			</Box>
		</Modal>
	);
}