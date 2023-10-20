import {
	usePostThreadCommentCreateFetcher,
	usePostThreadCommentDeleteFetcher
} from "@/hooks";
import { BASE_API_URL } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { generateUrl } from "@/libs/utils";
import { PostThreadCommentCreateInput } from "@/types";

const basePostThreadCommentIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POST_THREAD_COMMENTS.INDEX}`;
const basePostThreadCommentDetailApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POST_THREAD_COMMENTS.DETAIL}`;

export const usePostThreadCommentCreateHandler = () => {
	const { createPostThreadComment, isFormLoading } =
		usePostThreadCommentCreateFetcher();

	const handlePostThreadCommentCreate = (args: {
		postThreadId: number;
		input: PostThreadCommentCreateInput;
	}) => {
		const { postThreadId, input } = args;

		const apiUrl = generateUrl(basePostThreadCommentIndexApiUrl, {
			postThreadId,
		});
		const validationErrors = createPostThreadComment({
			apiUrl,
			input,
			mutateApiUrls: [apiUrl],
		});
		return validationErrors;
	};
	return { handlePostThreadCommentCreate, isFormLoading };
};

export const usePostThreadCommentDeleteHandler = () => {
	const { deletePostThreadComment, isFormLoading } =
		usePostThreadCommentDeleteFetcher();

	const handlePostThreadCommentDelete = (args: {
		postThreadId: number;
		postThreadCommentId: number;
	}) => {
		const { postThreadCommentId, postThreadId } = args;

		const apiUrl = generateUrl(basePostThreadCommentDetailApiUrl, {
			postThreadCommentId,
		});
		const postThreadCommentIndexApiUrl = generateUrl(
			basePostThreadCommentIndexApiUrl,
			{
				postThreadId,
			}
		);
		const validationErrors = deletePostThreadComment({
			apiUrl,
			mutateApiUrls: [postThreadCommentIndexApiUrl],
		});
		return validationErrors;
	};
	return { handlePostThreadCommentDelete, isFormLoading };
};
