import { ThreadBodyBase, ThreadWrapper } from "@/components/organisms";
import { useThreadContext } from "@/states/contexts";
import { usePostThreadCreateHandler } from "@/hooks";
import { DeltaPosition, PostThreadCommentCreateInput, PostThreadComments } from "@/types";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { useUserContext } from "@/states/contexts";

interface Props {
	x: number;
	y: number;
	setNewThreadOpen: (formOpen: boolean) => void;
}

export const ThreadNew: FC<Props> = (props) => {
	const { x, y, setNewThreadOpen } = props;

	const { state: loggedInUser } = useUserContext();

	const { comments, handleThreadCreate } = useThreadData();
	const {
		iconRef,
		formOpen,
		setFormOpen,
		iconDeltaPosition,
		handleThreadMovePosition,
		handleClose,
	} = useThreadUX({ x, y, setNewThreadOpen });

	const handleFormSubmit = async (input: PostThreadCommentCreateInput) => {
		await handleThreadCreate({ ...iconDeltaPosition }, { ...input });
		handleClose();
	};

	return (
		<>
			<ThreadWrapper
				user={loggedInUser}
				x={x}
				y={y}
				onHandleStop={handleThreadMovePosition}
				ref={iconRef}
				formOpen={formOpen}
				setFormOpen={setFormOpen}
			>
				<ThreadBodyBase
					iconRef={iconRef}
					isLoading={false}
					comments={comments}
					handleCommentCreate={handleFormSubmit}
					onClose={handleClose}
				/>
			</ThreadWrapper>
		</>
	);
};

// Custom hook for data fetching and CRUD functions

const useThreadData = () => {
	const [comments, setComments] = useState<PostThreadComments[]>([]);

	// Data Fetch
	const { handlePostThreadCreate, isFormLoading } =
		usePostThreadCreateHandler();

	const handleThreadCreate = async (
		deltaPosition: DeltaPosition,
		input: PostThreadCommentCreateInput
	) => {
		await handlePostThreadCreate({ input: deltaPosition, commentInput: input });
	};

	return {
		comments,
		handleThreadCreate,
	};
};

// Custom Hook for UX
interface UXProps {
	x: number;
	y: number;
	setNewThreadOpen: (formOpen: boolean) => void;
}

const useThreadUX = (props: UXProps) => {
	const { x, y, setNewThreadOpen } = props;

	const iconRef = useRef<HTMLDivElement>(null);
	const { dispatch } = useThreadContext();
	const [formOpen, setFormOpen] = useState<boolean>(false);

	const [iconDeltaPosition, setIconDeltaPosition] = useState<DeltaPosition>({
		x,
		y,
	});

	const handleThreadMovePosition = (input: DeltaPosition) => {
		setIconDeltaPosition({ ...input });
	};

	const handleClose = () => {
		dispatch({ type: "SET_THREAD_CLOSED" });
		setNewThreadOpen(false);
	};

	// delay to avoid glitch on first render
	useLayoutEffect(() => {
		setTimeout(() => {
			setFormOpen(true);
		}, 1);
	}, []);

	return {
		iconRef,
		formOpen,
		setFormOpen,
		iconDeltaPosition,
		handleThreadMovePosition,
		handleClose,
	};
};
