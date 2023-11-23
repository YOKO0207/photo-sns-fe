import { fetcherService } from "@/adapters";
import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES, FRONTEND_PATH } from "@/libs/routes";
import { SWRFetcher, generateUrl } from "@/libs/utils";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { Post, PostCreateInput, Posts } from "types";

export const usePostCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const router = useRouter();

	const createPost = async (
		args: {apiUrl: string, input: PostCreateInput}
	) => {
		const {apiUrl, input} = args;
		setIsFormLoading(true);
		try {
			const formData = new FormData();
			if (input.src && input.src instanceof File) {
				formData.append("src", input.src);
			}
			if (input.post_name) {
				formData.append("post_name", input.post_name);
			}
			if (input.post_content) {
				formData.append("post_content", input.post_content);
			}
			const res = await fetcherService.multiPost(apiUrl, formData);
			if (res && res.status >= 200 && res.status < 300) {
				toast.success(res?.data?.message || SYSTEM_MESSAGES.SUCCESS);
				router.push(FRONTEND_PATH.HOME)
			} else if (res?.data?.errors) {
				return res.data.errors;
			} else {
				toast.error(res?.data?.message || SYSTEM_MESSAGES.FAILURE);
			}
		} catch (error) {
			showBoundary(error);
		} finally {
			setIsFormLoading(false);
		}
	};

	return {
		createPost,
		isFormLoading,
	};
};

export const usePostDeleteFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const deletePost = async (args: {apiUrl: string, mutateApiUrls: string[]}) => {
		const {apiUrl, mutateApiUrls} = args;
		setIsFormLoading(true);

		try {
			const res = await fetcherService.delete(apiUrl);
			if (res && res.status >= 200 && res.status < 300) {
				mutateApiUrls.forEach((url) => mutate(url));
				toast.success(res?.data?.message || SYSTEM_MESSAGES.SUCCESS);
			} else if (res?.data?.errors) {
				return res.data.errors;
			} else {
				toast.error(res?.data?.message || SYSTEM_MESSAGES.FAILURE);
			}
		} catch (error) {
			showBoundary(error);
		} finally {
			setIsFormLoading(false);
		}
	};

	return {
		deletePost,
		isFormLoading,
	};
};

const basePostIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.INDEX}`;
const basePostDetailApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.DETAIL}`;

export const usePostIndexSWR = () => {
	return useSWR(basePostIndexApiUrl, SWRFetcher<Posts[]>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};

export const usePostDetailSWR = () => {
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	const getKey = useCallback(() => {
		if (!router.isReady) {
			return null;
		}
		const { postId } = router.query;
		if (postId == undefined) {
			showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
			return null;
		}
		return generateUrl(basePostDetailApiUrl, { postId });
	}, [router.isReady, router.query, showBoundary]);

	return useSWR(getKey, SWRFetcher<Post>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};

