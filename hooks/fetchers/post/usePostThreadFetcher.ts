import { fetcherService } from "@/adapters";
import { usePostThreadCommentCreateHandler } from "@/hooks";
import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { SWRFetcher, generateUrl } from "@/libs/utils";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import {
	PostThreadCommentCreateInput,
	PostThreadCreateInput,
	PostThreadCreateInputReturnValue,
	PostThreadUpdatePositionInput,
	PostThreads,
} from "types";

export const usePostThreadCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const { handlePostThreadCommentCreate, isFormLoading: isCommentFormLoading } =
		usePostThreadCommentCreateHandler();

	const createPostThread = async (args: {
		apiUrl: string;
		input: PostThreadCreateInput;
		commentInput: PostThreadCommentCreateInput;
		mutateApiUrls: string[];
	}) => {
		const { apiUrl, mutateApiUrls, input, commentInput } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.postWithReturnValue<
				PostThreadCreateInput,
				PostThreadCreateInputReturnValue
			>(apiUrl, input);
			if (res && res.status >= 200 && res.status < 300 && "data" in res?.data) {
				if (res?.data?.data?.id) {
					await handlePostThreadCommentCreate({
						postThreadId: res?.data?.data?.id,
						input: commentInput,
					});
				}
				mutateApiUrls.forEach((url) => mutate(url));
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
		createPostThread,
		isFormLoading,
	};
};

export const usePostThreadUpdatePositionFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const updatePostThreadPosition = async (
		args: { apiUrl: string, input: PostThreadUpdatePositionInput, mutateApiUrls: string[] }
	) => {
		const { apiUrl, input, mutateApiUrls } = args;
		setIsFormLoading(true);

		try {
			const res = await fetcherService.put(apiUrl, input);
			if (res && res.status >= 200 && res.status < 300) {
				mutateApiUrls.forEach((url) => mutate(url));
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
		updatePostThreadPosition,
		isFormLoading,
	};
};

export const usePostThreadDeleteFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const deletePostThread = async (args: { apiUrl: string, mutateApiUrls: string[] }) => {
		const { apiUrl, mutateApiUrls } = args;
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
		deletePostThread,
		isFormLoading,
	};
};

const basePostThreadIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POST_THREADS.INDEX}`;

export const usePostThreadIndexSWR = () => {
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
		return generateUrl(basePostThreadIndexApiUrl, { postId });
	}, [router.isReady, router.query, showBoundary]);

	return useSWR(getKey, SWRFetcher<PostThreads[]>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};
