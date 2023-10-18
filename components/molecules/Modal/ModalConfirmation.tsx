import { Box, Button, H5, IconButton, SParagraph } from "@/components/atoms";
import { colors } from "@/styles";
import { Icon } from "@iconify/react";
import MaterialModal from "@mui/material/Modal";
import { FC, useState } from "react";

interface Props {
	children: React.ReactNode;
	title: string;
	description?: string;
	onClickYes: () => void;
	onClose?: (e: Event) => void;
}

export const ModalConfirmation: FC<Props> = (props) => {
	const { children, title, description, onClickYes, onClose } = props;
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	const handleClose = (e: any) => {
		setOpen(false);
		if (onClose) onClose(e);
	};

	const handleClickYes = (e: any) => {
		setOpen(false);
		onClickYes();
		if (onClose) onClose(e);
	};

	return (
		<div>
			<Box onClick={handleOpen}>
				{children}
			</Box>
			<MaterialModal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					bg="gray.white"
					borderRadius="6px"
					py="16px"
					px="16px"
					width="28%"
					position="absolute"
					top="50%"
					left="50%"
					style={{
						transform: "translate(-50%, -50%)",
						outline: "unset",
					}}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mb={3}
						ml="8px"
					>
						<H5 mt={3} color="gray.600" fontWeight={600}>
							{title}
						</H5>
						<IconButton variant="text" size="small" onClick={handleClose}>
							<Icon
								icon={"charm:cross"}
								width={20}
								height={20}
								color={colors.gray[400]}
							/>
						</IconButton>
					</Box>
					<SParagraph ml="10px" color="gray.500">
						{description || ""}
					</SParagraph>
					<Box
						mt={5}
						mb={1}
						display="flex"
						width="100%"
						justifyContent="flex-end"
					>
						<Button
							mr="12px"
							size="sm"
							variant="contained"
							color="grayVariant"
							onClick={handleClose}
						>
							いいえ
						</Button>
						<Button
							size="sm"
							variant="contained"
							color="tertiary"
							onClick={handleClickYes}
						>
							はい
						</Button>
					</Box>
				</Box>
			</MaterialModal>
		</div>
	);
};
