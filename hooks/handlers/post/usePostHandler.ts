import {
	usePostCreateFetcher,
	usePostDeleteFetcher
} from "@/hooks";
import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { generateUrl } from "@/libs/utils";
import { PostCreateInput } from "@/types";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";

const basePostIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.INDEX}`;
const basePostDetailBaseApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.DETAIL}`;

export const usePostCreateHandler = () => {
	const { createPost, isFormLoading } =
		usePostCreateFetcher();

	const handlePostCreate = (args: { input: PostCreateInput }) => {
		const { input } = args;

		const validationErrors = createPost({
			apiUrl: basePostIndexApiUrl,
			input,
		});

		return validationErrors;
	};

	return { handlePostCreate, isFormLoading };
};

export const usePostDeleteHandler = () => {
	const { deletePost, isFormLoading } = usePostDeleteFetcher();
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	const handlePostDelete = () => {
		if (router.isReady) {
			const { postId } = router.query;
			if (postId == undefined) {
				showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
				return null;
			}

			const apiUrl = generateUrl(basePostDetailBaseApiUrl, {
				postId,
			});

			const validationErrors = deletePost({
				apiUrl,
				mutateApiUrls: [basePostIndexApiUrl],
			});
			return validationErrors;
		}
	};
	return { handlePostDelete, isFormLoading };
};
