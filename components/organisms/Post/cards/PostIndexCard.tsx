import { Box, Image, SParagraph } from "@/components/atoms";
import { Alphabetavatar } from "@/components/molecules";
import { UserName } from "@/components/organisms";
import { Posts } from "@/types";
import { FC, useState } from "react";

export const PostIndexCard: FC<Posts> = (props) => {
	const { id, src, post_content, post_name, user } = props;
	const [isHover, setIsHover] = useState(false);

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
					<Box position="absolute" top="16px" left={0} zIndex={999} width="100%" px="16px">
						<SParagraph color="gray.white" ellipsis>
							{post_name}
						</SParagraph>
					</Box>
					<Box position="absolute" bottom="20px" right="16px" zIndex={999}>
						<UserName {...user} size="sm" textColor="gray.white" />
					</Box>
					<Box
						bg="gray.600"
						opacity="0.5"
						position="absolute"
						width="100%"
						height="98%"
						borderRadius="4px"
						top={0}
						right={0}
						zIndex={1}
					/>
				</>
			)}
		</Box>
	);
};
