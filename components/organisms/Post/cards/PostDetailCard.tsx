import { Box, Image } from "@/components/atoms";
import { Thread, ThreadNew } from "@/components/organisms";
import { usePostThreadIndexSWR } from "@/hooks";
import {
	ThreadProvider,
	useThreadContext,
	useUserContext,
} from "@/states/contexts";
import { DeltaPosition, Post, PostThreads, Posts } from "@/types";
import { FC, useState } from "react";

// TDDO make custom hook
export const PostDetailCard: FC<Post> = (props) => {
	return (
		<ThreadProvider>
			<PostCardRoot {...props} />
		</ThreadProvider>
	);
};

const PostCardRoot: FC<Posts> = (props) => {
	const { src } = props;
	const { state: loggedInUser } = useUserContext();

	// Data Fetch
	const { data: postThreads, isLoading } = usePostThreadIndexSWR();

	// UX
	const [newThreadOpen, setNewThreadOpen] = useState(false);
	const { state, dispatch } = useThreadContext();
	const [newThreadDeltaPosition, setNewThreadDeltaPosition] =
		useState<DeltaPosition>({
			x: 0,
			y: 0,
		});

	const handleNewThreadOpen = (e: any) => {
		if (
			// TODO refector to not using className
			e.target.closest(".thread")
		)
			return;
		const deltaPositionAdjuestX = 16;
		const deltaPositionAdjuestY = 1;
		const parentRect = e.target.parentNode.getBoundingClientRect();
		const xPosition = e.clientX - parentRect.left - deltaPositionAdjuestY;
		const yPosition = e.clientY - parentRect.top - deltaPositionAdjuestX;
		setNewThreadDeltaPosition({ x: xPosition, y: yPosition });
		setNewThreadOpen(true);
		dispatch({ type: "SET_THREAD_OPEN" });
	};

	return (
		<Box
			style={{
				cursor:
					!state.threadOpen && loggedInUser.isLoggedIn
						? "url('/assets/images/comment-cursor-icon.png'), auto"
						: "auto",
			}}
			position="relative"
			onClick={!state.threadOpen ? handleNewThreadOpen : () => {}}
			width="460px"
			height="580px"
		>
			<Image
				position="absolute"
				top={0}
				left={0}
				width="100%"
				height="100%"
				style={{
					objectFit: "contain",
				}}
				src={src}
				alt="post image"
			/>
			{postThreads?.data?.data?.map((item: PostThreads) => (
				<Thread key={item.id} {...item} />
			))}
			{newThreadOpen && loggedInUser.isLoggedIn && (
				<ThreadNew
					x={newThreadDeltaPosition.x}
					y={newThreadDeltaPosition.y}
					setNewThreadOpen={setNewThreadOpen}
				/>
			)}
		</Box>
		// </Box>
	);
};
