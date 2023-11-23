import { Box, Image, LinkRouter, SParagraph } from "@/components/atoms";
import { DropDown } from "@/components/molecules";
import { Alphabetavatar } from "@/components/molecules";
import { UserName } from "@/components/organisms";
import { FRONTEND_PATH } from "@/libs/routes";
import { Posts } from "@/types";
import { FC, useState } from "react";
import { colors } from "@/styles";
import { useUserContext } from "@/states/contexts";
import { usePostDeleteHandler } from "@/hooks";

export const PostIndexCard: FC<Posts> = (props) => {
	const { id, src, post_content, post_name, user } = props;
	const [isHover, setIsHover] = useState(false);

	const { state: loggedInUser } = useUserContext();

	const { handlePostDelete } = usePostDeleteHandler();

	return (
		<Box
			position="relative"
			borderRadius="4px"
			onMouseEnter={() => {
				setIsHover(true);
			}}
			onMouseLeave={() => setIsHover(false)}
			cursor="zoom-in"
		>
			<Image src={src} alt="post image" width="100%" borderRadius="4px" />
			{isHover && (
				<>
					<LinkRouter
						href={FRONTEND_PATH.POSTS.DETAIL}
						query={{ postId: id }}
						bg="gray.600"
						opacity="0.5"
						width="100%"
						height="98%"
						style={{
							position: "absolute",
							borderRadius: "4px",
							top: 0,
							right: 0,
							zIndex: 1,
							cursor: "zoom-in",
						}}
					/>
					<Box
						position="absolute"
						top="16px"
						left={0}
						zIndex={999}
						width="100%"
						px="16px"
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<SParagraph color="gray.white" ellipsis>
							{post_name}
						</SParagraph>
					</Box>
					<Box position="absolute" bottom="20px" right="16px" zIndex={999}>
						<UserName {...user} size="sm" textColor="gray.white" />
					</Box>
					{loggedInUser?.id === user?.id && (
						<Box position="absolute" bottom="10px" left="0px" zIndex={999}>
						<DropDown
							color={colors.gray.white}
							listFunction={[
								{
									key: "delete",
									name: "スレッドを削除",
									function: () => {
										handlePostDelete({postId: id});
									},
									modal: {
										title: "投稿を削除しますか？",
										description:
											"削除は取り消せません。",
										onClose: () => setIsHover(false),
									},
								},
							]}
							size={28}
						/>
					</Box>
					)}
				</>
			)}
		</Box>
	);
};
