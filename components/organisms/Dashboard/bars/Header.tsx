import {
	Box,
	Card,
	H5,
	LinkButton,
	LinkRouter,
	MSpan,
	Typography,
} from "@/components/atoms";
import { Alphabetavatar, ModalConfirmation } from "@/components/molecules";
import { useUserLogoutHandler } from "@/hooks";
import { FRONTEND_PATH } from "@/libs/routes";
import { useUserContext } from "@/states/contexts";
import { colors } from "@/styles";
import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";

export const Header = () => {
	const { state: user } = useUserContext();
	return (
		<Box
			bg="gray.white"
			display="flex"
			position="sticky"
			top="0"
			left="0"
			p="14px 28px"
			zIndex={1000}
			justifyContent="space-between"
			alignItems="center"
			height="64px"
			borderBottom="1px solid"
			borderColor="gray2.50"
		>
			<LinkRouter href={FRONTEND_PATH.HOME}>
				<H5 fontSize="20px" width="160px" color="primary.500" fontWeight="bold">
					Pointy
				</H5>
			</LinkRouter>
			{user.isLoggedIn ? (
				<Box display="flex" gap="12px" alignItems="center">
					<LinkButton
						href={FRONTEND_PATH.POSTS.NEW}
						color="primary"
						variant="outlined"
						size="md"
					>
						投稿作成
					</LinkButton>
					<LoggedInHeaderMenu />
				</Box>
			) : (
				<Box display="flex" gap="8px">
					<LinkButton
						href={FRONTEND_PATH.USER.LOGIN}
						color="primary"
						variant="outlined"
						size="md"
					>
						ログイン
					</LinkButton>
					<LinkButton
						href={FRONTEND_PATH.USER.REGISTER}
						color="primary"
						variant="contained"
						size="md"
					>
						新規登録
					</LinkButton>
				</Box>
			)}
		</Box>
	);
};

const LoggedInHeaderMenu = () => {
	const { state: user } = useUserContext();
	const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

	const { handleUserLogout, isFormLoading: userLogoutFormLoading } =
		useUserLogoutHandler();

	return (
		<StyledMenuBar>
			<Box
				display="flex"
				className="root"
				position="relative"
				flexDirection="column"
				alignItems="center"
			>
				<Box
					display="flex"
					alignItems="center"
					style={{ cursor: "pointer" }}
					onClick={() => setIsHeaderMenuOpen((prev) => !prev)}
				>
					<Alphabetavatar name={user?.name[0] || ""} size="md" />
				</Box>

				{isHeaderMenuOpen && (
					<Box className="root-child">
						<Card
							mt="40px"
							minWidth="230px"
							border="1px solid"
							borderColor="gray.200"
							bg="gray.white"
						>
							<Box
								borderBottomWidth={"1px"}
								borderBottomStyle="solid"
								borderBottomColor="gray.200"
								px="20px"
								py="15px"
							>
								<Typography fontWeight="bold" fontSize="16px">
									{user?.name || ""}
								</Typography>
								<MSpan color="gray.300" fontWeight="400">
									{user?.email || ""}
								</MSpan>
							</Box>
							<Box px="20px" py="10px">
								<LinkRouter
									href={FRONTEND_PATH.USER.ACCOUNT.NAME}
									color="gray.900"
								>
									<Box display="flex" alignItems="center" py="5px">
										<Box
											display="flex"
											color="gray.900"
											mr="10px"
											alignItems="center"
										>
											<Icon
												icon="ph:user-bold"
												width={20}
												color="primary.main"
											/>
										</Box>

										<Typography>プロフィール</Typography>
									</Box>
								</LinkRouter>
								<LinkRouter
									href={FRONTEND_PATH.USER.ACCOUNT.EMAIL.INDEX}
									color="gray.900"
								>
									<Box display="flex" alignItems="center" py="5px">
										<Box
											display="flex"
											color="gray.900"
											mr="10px"
											alignItems="center"
										>
											<Icon
												icon="material-symbols:mail-outline-rounded"
												width={20}
												color="primary.main"
											/>
										</Box>

										<Typography>メールアドレス</Typography>
									</Box>
								</LinkRouter>
								<LinkRouter
									href={FRONTEND_PATH.USER.ACCOUNT.PASSWORD}
									color="gray.900"
								>
									<Box display="flex" alignItems="center" py="5px">
										<Box
											display="flex"
											color="gray.900"
											mr="10px"
											alignItems="center"
										>
											<Icon
												icon="material-symbols:lock-outline"
												width={20}
												color="primary.main"
											/>
										</Box>

										<Typography>パスワード</Typography>
									</Box>
								</LinkRouter>
							</Box>
							<Box
								borderTopWidth={"1px"}
								borderTopStyle="solid"
								borderTopColor="gray.200"
								px="20px"
								py="20px"
							>
								<ModalConfirmation
									title="ログアウトしますか？"
									onClickYes={handleUserLogout}
								>
									<Box
										display="flex"
										justifyContent="flex-start"
										alignItems="center"
										style={{ cursor: "pointer" }}
									>
										<Box
											display="flex"
											color="gray.900"
											mr="10px"
											alignItems="center"
										>
											<Icon
												icon="ph:sign-out-bold"
												width={20}
												color="primary.main"
											/>
										</Box>

										<Typography fontWeight="400" fontSize="16px">
											ログアウト
										</Typography>
									</Box>
								</ModalConfirmation>
							</Box>
						</Card>
					</Box>
				)}
			</Box>
		</StyledMenuBar>
	);
};

export const StyledMenuBar = styled.div`
	position: relative;

	.nav-link {
		font-size: 14px;
		margin-right: 32px;
		cursor: pointer;
		:hover {
			color: ${colors.primary[500]};
		}
	}
	.nav-link:last-child {
		margin-right: 0px;
	}

	.root-child {
		position: absolute;
		right: 0;
		top: 100%;
		z-index: 5;
	}

	.child {
		display: none;
		position: absolute;
		top: 0;
		left: 100%;
		z-index: 5;
	}
	.parent:hover > .child {
		display: block;
	}

	.dropdown-icon {
		color: ${colors.gray[100]};
	}
`;
