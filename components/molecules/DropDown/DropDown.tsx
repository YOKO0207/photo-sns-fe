import { Box, SParagraph } from "@/components/atoms";
import { ModalConfirmation } from "@/components/molecules";
import { colors } from "@/styles";
import { ListFunc } from "@/types";
import { Icon } from "@iconify/react";
import MaterialButton from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
	listFunction: ListFunc[];
	size?: number;
	color?: string;
}

export const DropDown: FC<Props> = (props) => {
	const { listFunction, size, color } = props;
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	}

	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<>
			<MaterialButton
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<Box
					bg={open ? "info.500" : "unset"}
					height={size || "30px"}
					borderRadius={4}
					px={0.5}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Icon
						icon={"solar:menu-dots-bold"}
						width={size || 30}
						height={size || 30}
						color={open ? colors.gray.white : color || colors.gray.black}
					/>
				</Box>
			</MaterialButton>
			<StyledPopper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom-start" ? "left top" : "left bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									{listFunction.map((item, index) => {
										return (
											<>
												{item.modal ? (
													<MenuItem
														key={index}
														style={{
															display: "block",
															width: "100%",
															cursor: "pointer",
														}}
													>
														<ModalConfirmation
															title={item.modal.title}
															description={item.modal.description}
															onClickYes={item.function}
															onClose={(e) => {
																handleClose(e)
																item.modal?.onClose && item.modal.onClose()
															}}
														>
															<SParagraph my={0}>{item.name}</SParagraph>
														</ModalConfirmation>
													</MenuItem>
												) : (
													<MenuItem
														key={index}
														style={{ display: "block", width: "100%" }}
														onClick={(e) => {
															handleClose(e);
															item.function();
														}}
													>
														<SParagraph my={0}>{item.name}</SParagraph>
													</MenuItem>
												)}
											</>
										);
									})}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</StyledPopper>
		</>
	);
};

const StyledPopper = styled(Popper)`
	z-index: 999;
	.MuiPaper-root {
		background-color: ${colors.gray[950]};
		color: ${colors.gray.white};
	}
	.MuiMenuItem-root {
	}
	.MuiMenuItem-root:hover {
		background-color: ${colors.gray[800]};
	}
`;
