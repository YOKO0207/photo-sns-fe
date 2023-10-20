import {
	usePostThreadCreateFetcher,
	usePostThreadDeleteFetcher,
	usePostThreadUpdatePositionFetcher,
} from "@/hooks";
import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { generateUrl } from "@/libs/utils";
import {
	PostThreadCommentCreateInput,
	PostThreadCreateInput,
	PostThreadUpdatePositionInput,
} from "@/types";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";

const basePostThreadIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POST_THREADS.INDEX}`;
const basePostThreadDetailApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POST_THREADS.DETAIL}`;

export const usePostThreadCreateHandler = () => {
	const { createPostThread, isFormLoading } = usePostThreadCreateFetcher();
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	const handlePostThreadCreate = (args: {
		input: PostThreadCreateInput;
		commentInput: PostThreadCommentCreateInput;
	}) => {
		const { input, commentInput } = args;
		if (router.isReady) {
			const { postId } = router.query;
			if (postId == undefined) {
				showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
				return null;
			}
			const apiUrl = generateUrl(basePostThreadIndexApiUrl, {
				postId,
			});
			const validationErrors = createPostThread({
				apiUrl,
				input,
				commentInput,
				mutateApiUrls: [apiUrl],
			});
			return validationErrors;
		}
	};
	return { handlePostThreadCreate, isFormLoading };
};

export const usePostThreadPositionUpdateHandler = () => {
	const { updatePostThreadPosition, isFormLoading } =
		usePostThreadUpdatePositionFetcher();
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	const handlePostThreadPositionUpdate = (args: {
		postThreadId: number;
		input: PostThreadUpdatePositionInput;
	}) => {
		const { postThreadId, input } = args;
		if (router.isReady) {
			const { postId } = router.query;
			if (postId == undefined) {
				showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
				return null;
			}
			const apiUrl = generateUrl(basePostThreadDetailApiUrl, {
				postThreadId,
			});
			const validationErrors = updatePostThreadPosition({
				apiUrl,
				input,
				mutateApiUrls: [apiUrl],
			});
			return validationErrors;
		}
	};
	return { handlePostThreadPositionUpdate, isFormLoading };
};

export const usePostThreadDeleteHandler = () => {
	const { deletePostThread, isFormLoading } = usePostThreadDeleteFetcher();
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	const handlePostThreadDelete = (args: { postThreadId: number }) => {
		const { postThreadId } = args;
		if (router.isReady) {
			const { postId } = router.query;
			if (postId == undefined) {
				showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
				return null;
			}

			const apiUrl = generateUrl(basePostThreadDetailApiUrl, {
				postThreadId,
			});
			const postThreadIndexApiUrl = generateUrl(basePostThreadIndexApiUrl, {
				postId,
			});

			const validationErrors = deletePostThread({
				apiUrl,
				mutateApiUrls: [postThreadIndexApiUrl],
			});
			return validationErrors;
		}
	};
	return { handlePostThreadDelete, isFormLoading };
};
