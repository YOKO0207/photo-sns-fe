import { fetcherService } from "@/adapters";
import { SYSTEM_MESSAGES } from "@/libs/constants";
import { FRONTEND_PATH } from "@/libs/routes";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import {
	UserEmailUpdateInput,
	UserNameUpdateInput,
	UserPasswordUpdateInput,
} from "types";

export const useUserPasswordUpdateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const updateUserPassword = async (
		args: {apiUrl: string, input: UserPasswordUpdateInput}
	) => {
		const { apiUrl, input } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.put(apiUrl, input);
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
		updateUserPassword,
		isFormLoading,
	};
};

export const useUserEmailUpdateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const router = useRouter();

	const updateUserEmail = async (
		args: {
			apiUrl: string,
			input: UserEmailUpdateInput
		}
	) => {
		const { apiUrl, input } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.put(apiUrl, input);
			if (res && res.status >= 200 && res.status < 300) {
				router.push(FRONTEND_PATH.USER.ACCOUNT.EMAIL.SENT);
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
		updateUserEmail,
		isFormLoading,
	};
};

export const useUserProfileUpdateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const updateUserProfile = async (
		args: {apiUrl: string, input: UserNameUpdateInput}
	) => {
		const { apiUrl, input } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.put(apiUrl, input);
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
		updateUserProfile,
		isFormLoading,
	};
};
