import { ThreadBody, ThreadWrapper } from "@/components/organisms";
import { useThreadContext } from "@/states/contexts";
import { usePostThreadPositionUpdateHandler } from "@/hooks";
import { DeltaPosition, PostThreads } from "@/types";
import { FC, useRef, useState } from "react";

export const Thread: FC<PostThreads> = (props) => {
	const { id, x, y, user } = props;

	const { handleThreadUpdatePosition } = useThreadData({ postThreadId: id });

	const { iconRef, formOpen, setFormOpen, handleClose } = useThreadUX();

	return (
		<ThreadWrapper
			user={user}
			x={x}
			y={y}
			onHandleStop={handleThreadUpdatePosition}
			ref={iconRef}
			formOpen={formOpen}
			setFormOpen={setFormOpen}
		>
			<ThreadBody
				user={user}
				postThreadId={id}
				iconRef={iconRef}
				handleClose={handleClose}
			/>
		</ThreadWrapper>
	);
};

// Custom hook for Data fetching and CRUD functions
interface ThreadDataProps {
	postThreadId: number;
}
const useThreadData = (props: ThreadDataProps) => {
	const { postThreadId } = props;

	const { handlePostThreadPositionUpdate, isFormLoading } =
		usePostThreadPositionUpdateHandler();

	// CRUD functions
	const handleThreadUpdatePosition = async (input: DeltaPosition) => {
		await handlePostThreadPositionUpdate({postThreadId, input});
	};

	return {
		handleThreadUpdatePosition,
	};
};

// Custom hook for UX functions
const useThreadUX = () => {
	const iconRef = useRef<HTMLDivElement>(null);
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const { dispatch } = useThreadContext();
	const handleClose = () => {
		setFormOpen(false);
		dispatch({ type: "SET_THREAD_CLOSED" });
	};

	return {
		iconRef,
		formOpen,
		setFormOpen,
		handleClose,
	};
};
