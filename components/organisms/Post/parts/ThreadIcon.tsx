import { Box, Image, SSpan } from "@/components/atoms";
import { ListUser } from "@/types";
import { FC } from "react";

interface Props {
	user: ListUser | undefined;
	formOpen: boolean;
}

export const ThreadIcon: FC<Props> = (props) => {
	const { user, formOpen } = props;

	return (
		<>
			<Image
				src={formOpen ? "/assets/images/comment-selected-icon.png" : "/assets/images/comment-icon.png"}
				alt="comment icon"
				height="40px"
				width="40px"
				position="absolute"
				mt="5px"
				ml="3px"
			/>
				<Box
					position="absolute"
					bg="primary.500"
					borderRadius="50%"
					color="white"
					p={1}
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="22px"
					height="22px"
					mt="2px"
				>
					<SSpan>{user?.name[0] || "G"}</SSpan>
				</Box>
		</>
	);
};
