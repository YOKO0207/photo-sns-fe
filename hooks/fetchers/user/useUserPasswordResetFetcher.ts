import { fetcherService } from "@/adapters";
import { SYSTEM_MESSAGES } from "@/libs/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import { PasswordForgetInput, PasswordResetRequest } from "types";

export const useUserPasswordForgetFetcher = () => {
	const router = useRouter();
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const sendPasswordResetEmail = async (
		apiUrl: string,
		redirectPath: string,
		input: PasswordForgetInput
	) => {
		setIsFormLoading(true);
		try {
			const res = await fetcherService.post(apiUrl, { ...input });
			if (res && res.status >= 200 && res.status < 300) {
				router.push(redirectPath);
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
		sendPasswordResetEmail,
		isFormLoading,
	};
};

export const useUserPasswordResetFetcher = () => {
	const router = useRouter();
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const resetUserPassword = async (
		apiUrl: string,
		redirectPath: string,
		input: PasswordResetRequest
	) => {
		setIsFormLoading(true);
		try {
			const res = await fetcherService.post(apiUrl, { ...input });
			if (res && res.status >= 200 && res.status < 300) {
				router.push(redirectPath);
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
		resetUserPassword,
		isFormLoading,
	};
};
