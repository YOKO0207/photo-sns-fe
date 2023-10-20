import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { fetcherService } from "@/adapters";
import { SWRFetcher, generateUrl } from "@/libs/utils";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import {
	PostThreadCommentCreateInput,
	PostThreadComments
} from "types";

export const usePostThreadCommentCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const createPostThreadComment = async (args: {
		apiUrl: string;
		input: PostThreadCommentCreateInput;
		mutateApiUrls: string[];
	}) => {
		const { apiUrl, input, mutateApiUrls } = args;
		setIsFormLoading(true);

		try {
			const res = await fetcherService.post(apiUrl, input);
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
		createPostThreadComment,
		isFormLoading,
	};
};

export const usePostThreadCommentDeleteFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const deletePostThreadComment = async (args: {
		apiUrl: string;
		mutateApiUrls: string[];
	}) => {
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
		deletePostThreadComment,
		isFormLoading,
	};
};

const basePostThreadCommentIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POST_THREAD_COMMENTS.INDEX}`;

export const usePostThreadCommentIndexSWR = (args: {postThreadId: number}) => {
	const { postThreadId } = args;

	const url = generateUrl(basePostThreadCommentIndexApiUrl, { postThreadId });
	return useSWR(url, SWRFetcher<PostThreadComments[]>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};
