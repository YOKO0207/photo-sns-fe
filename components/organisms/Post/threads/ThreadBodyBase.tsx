import { Box, IconButton, MSpan, SSpan, XSParagraph } from "@/components/atoms";
import { DropDown } from "@/components/molecules";
import { ThreadForm } from "@/components/organisms";
import { usePositionForm } from "@/hooks";
import { useUserContext } from "@/states/contexts";
import {
	colors,
	projectCommentFormWidth,
	shadows,
	threadFormFooterHeight,
	threadFormHeaderHeight,
	threadFormPaddingY,
} from "@/styles";
import {
	PostThreadCommentCreateInput,
	PostThreadComments,
	ListUser,
} from "@/types";
import { Icon } from "@iconify/react";
import { FC, RefObject, useEffect, useRef } from "react";

interface Props {
	iconRef: RefObject<HTMLDivElement>;
	isLoading: boolean;
	user?: ListUser;
	comments: PostThreadComments[];

	handleThreadDelete?: () => void;
	handleCommentDelete?: (photo_comment_id: number) => void;

	handleCommentCreate: (input: PostThreadCommentCreateInput) => void;
	onClose: () => void;
}

export const ThreadBodyBase: FC<Props> = (props) => {
	const {
		iconRef,
		handleThreadDelete,
		handleCommentCreate,
		handleCommentDelete,
		isLoading,
		comments,
		user,
		onClose,
	} = props;

	const formRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollBox = contentRef.current;
		if (scrollBox) {
			scrollBox.scrollTop = scrollBox.scrollHeight;
		}
	});

	const { commentFormHeight, formDeltaPosition } = usePositionForm({
		iconRef,
		formRef,
		comments,
	});

	const { state: loggedInUser } = useUserContext();

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<Box
						className="project-thread-form"
						ref={formRef}
						top={formDeltaPosition.y}
						left={formDeltaPosition.x}
						position="fixed"
						zIndex={2}
						py={`${threadFormPaddingY}px`}
					>
						<Box
							bg="grayTransparent.900"
							borderRadius={4}
							width={projectCommentFormWidth}
							px="8px"
							style={{ boxShadow: shadows[30] }}
						>
							<Box
								width="100%"
								height={threadFormHeaderHeight}
								display="flex"
								alignItems="center"
								justifyContent="flex-end"
								borderBottom="1px solid"
								borderBottomColor="gray.500"
								py="6px"
							>
								{handleThreadDelete &&
									loggedInUser.isLoggedIn && user?.id === loggedInUser.id && (
										<DropDown
											color={colors.gray.white}
											listFunction={[
												{
													key: "delete",
													name: "スレッドを削除",
													function: () => {
														handleThreadDelete();
														onClose();
													},
													modal: {
														title: "スレッドを削除しますか？",
														description:
															"このスレッドに含まれるコメントも削除されます。",
													},
												},
											]}
											size={22}
										/>
									)}

								<IconButton px="12px" variant="text" size="small">
									<Icon
										icon={"charm:cross"}
										width={22}
										height={22}
										color={colors.gray.white}
										onClick={onClose}
									/>
								</IconButton>
							</Box>
							<Box
								ref={contentRef}
								overflowY="scroll"
								height={commentFormHeight}
							>
								{comments?.map((item: PostThreadComments) => (
									<Box
										display="flex"
										alignItems="flex-start"
										justifyContent="space-between"
										my="14px"
										mx="4px"
										key={item.id}
									>
										<Box display="flex">
											<Box
												bg="primary.500"
												borderRadius="50%"
												minWidth="26px"
												height="26px"
												display="flex"
												alignItems="center"
												justifyContent="center"
											>
												<MSpan color="gray.white">
													{item.user.name[0] || "G"}
												</MSpan>
											</Box>
											<Box mx="12px">
												<Box display="flex" alignItems="center" mb="8px">
													<SSpan color="gray.white">
														{item.user.name || "Guest"}
													</SSpan>
													<SSpan color="gray.400" ml="12px">
														{item.updated_at}
													</SSpan>
												</Box>
												<XSParagraph
													lineHeight="1.6"
													letterSpacing="1px"
													color="gray.white"
												>
													{item.content}
												</XSParagraph>
											</Box>
										</Box>
										{handleCommentDelete &&
											loggedInUser.isLoggedIn &&
											item.user.id === loggedInUser.id && (
												<DropDown
													color={colors.gray.white}
													listFunction={[
														{
															key: "delete",
															name: "削除する",
															modal: {
																title: "コメントを削除しますか？",
																description: "削除は取り消せません。",
															},
															function: () => handleCommentDelete(item.id),
														},
													]}
													size={24}
												/>
											)}
									</Box>
								))}
							</Box>
							{loggedInUser.isLoggedIn && (
								<ThreadForm
									height={threadFormFooterHeight}
									onFormSubmit={handleCommentCreate}
								/>
							)}
						</Box>
					</Box>

					{/* overlay to close form */}
					<Box
						position="fixed"
						top={0}
						left={0}
						width="100%"
						height="100vh"
						onClick={onClose}
						zIndex={1}
					/>
				</>
			)}
		</>
	);
};
