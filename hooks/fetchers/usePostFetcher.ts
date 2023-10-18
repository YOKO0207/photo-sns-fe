import { fetcherService } from "@/adapters";
import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { SWRFetcher } from "@/libs/utils";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { PostCreateInput, Posts } from "types";

export const usePostCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

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

const basePhotoMaterialIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.INDEX}`;

export const usePostIndexSWR = () => {
	return useSWR(basePhotoMaterialIndexApiUrl, SWRFetcher<Posts[]>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};
