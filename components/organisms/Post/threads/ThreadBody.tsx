import { ThreadBodyBase } from "@/components/organisms";
import {
	usePostThreadCommentCreateHandler,
	usePostThreadCommentDeleteHandler,
	usePostThreadDeleteHandler,
	usePostThreadCommentIndexSWR,
} from "@/hooks";
import {
	PostThreadCommentCreateInput,
	PostThreadComments,
	ListUser,
} from "@/types";
import { FC } from "react";

interface Props {
	postThreadId: number;
	iconRef: React.RefObject<HTMLDivElement>;
	handleClose: () => void;
	user: ListUser;
}

export const ThreadBody: FC<Props> = (props) => {
	const { postThreadId, iconRef, handleClose, user } = props;

	const {
		isLoading,
		comments,
		handleCommentDelete,
		handleThreadDelete,
		handleCommentCreate,
	} = useCommentData({ postThreadId });

	return (
		<ThreadBodyBase
			iconRef={iconRef}
			isLoading={isLoading}
			comments={comments}
			user={user}
			handleCommentDelete={handleCommentDelete}
			handleThreadDelete={handleThreadDelete}
			handleCommentCreate={handleCommentCreate}
			onClose={handleClose}
		/>
	);
};

// Custom hook for Data fetching and CRUD functions
interface CommentDataProps {
	postThreadId: number;
}
const useCommentData = (props: CommentDataProps) => {
	const { postThreadId } = props;
	const { handlePostThreadCommentCreate, isFormLoading: createFormLoading } =
		usePostThreadCommentCreateHandler();
	const { handlePostThreadCommentDelete, isFormLoading: deleteFormLoading } =
		usePostThreadCommentDeleteHandler();
	const { handlePostThreadDelete, isFormLoading: threadDeleteLoading } =
		usePostThreadDeleteHandler();

	// Data fetching
	const { data, isLoading } = usePostThreadCommentIndexSWR({ postThreadId });
	const comments = data?.data?.data as PostThreadComments[];

	// CRUD functions
	const handleThreadDelete = async () => {
		await handlePostThreadDelete({ postThreadId });
	};
	const handleCommentCreate = async (input: PostThreadCommentCreateInput) => {
		await handlePostThreadCommentCreate({postThreadId, input});
	};
	const handleCommentDelete = async (postThreadCommentId: number) => {
		await handlePostThreadCommentDelete({ postThreadId, postThreadCommentId });
	};

	return {
		isLoading,
		comments,
		handleCommentDelete,
		handleThreadDelete,
		handleCommentCreate,
	};
};
