import { fetcherService } from "@/adapters";
import { BASE_BACKEND_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES, FRONTEND_PATH } from "@/libs/routes";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import { UserLoginInput, UserRegisterInput } from "types";

const useCSRFTokenFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();

	const getCSRFToken = async () => {
		setIsFormLoading(true);
		try {
			const apiUrl = `${BASE_BACKEND_URL}/${BACKEND_ROUTES.CSRF_TOKEN}`;
			const res = await fetcherService.get(apiUrl);
			if (res && res.status >= 200 && res.status < 300) {
				return res;
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
		getCSRFToken,
		isFormLoading,
	};
};

export const useUserRegisterFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const { getCSRFToken } = useCSRFTokenFetcher();
	const router = useRouter();

	const registerAsUser = async (
		apiUrl: string,
		redirectPath: string,
		input: UserRegisterInput
	) => {
		setIsFormLoading(true);
		const csrfRes = await getCSRFToken();
		if (csrfRes) {
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
		}
	};

	return {
		registerAsUser,
		isFormLoading,
	};
};

export const useUserLoginFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const { getCSRFToken } = useCSRFTokenFetcher();
	const router = useRouter();

	const loginAsUser = async (apiUrl: string, input: UserLoginInput) => {
		setIsFormLoading(true);
		const csrfRes = await getCSRFToken();
		if (csrfRes) {
			try {
				const res = await fetcherService.post(apiUrl, { ...input });
				if (res && res.status >= 200 && res.status < 300) {
					router.push(FRONTEND_PATH.HOME);
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
		}
	};

	return {
		loginAsUser,
		isFormLoading,
	};
};

export const useUserLogoutFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const router = useRouter();

	const logoutAsUser = async (apiUrl: string, redirectPath: string) => {
		setIsFormLoading(true);
		try {
			const res = await fetcherService.post(apiUrl, {});
			if (res && res.status >= 200 && res.status < 300) {
				toast.success(res?.data?.message || SYSTEM_MESSAGES.SUCCESS);
				router.push(redirectPath);
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
		logoutAsUser,
		isFormLoading,
	};
};
