import { fetcherService } from "@/adapters";
import { BASE_BACKEND_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES, FRONTEND_PATH } from "@/libs/routes";
import { useUserContext } from "@/states/contexts";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import {
	User,
	UserLoginInput,
	UserRegisterInput,
	UserAuthResponse,
} from "types";

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
		args: {apiUrl: string, input: UserRegisterInput}
	) => {
		const { apiUrl, input } = args;
		setIsFormLoading(true);
		const csrfRes = await getCSRFToken();
		if (csrfRes) {
			try {
				const res = await fetcherService.post(apiUrl, input);
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
		registerAsUser,
		isFormLoading,
	};
};

export const useUserLoginFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const router = useRouter();
	const { dispatch } = useUserContext();

	const loginAsUser = async (args: {apiUrl: string, input: UserLoginInput}) => {
		const { apiUrl, input } = args;
		setIsFormLoading(true);
		try {
			const res =
				await fetcherService.postWithReturnValue<UserLoginInput, UserAuthResponse>(
					apiUrl,
					input
				);
			if (res && res.status >= 200 && res.status < 300 && res?.data?.data) {
				// Store the token in local storage
				localStorage.setItem("access-token", res?.data?.data?.access_token);

				dispatch({ type: "SET_USER_DATA", payload: res?.data?.data as User });
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
	const { dispatch } = useUserContext();

	const logoutAsUser = async (args: {apiUrl: string}) => {
		const { apiUrl } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.post(apiUrl, {});
			if (res && res.status >= 200 && res.status < 300) {
				toast.success(res?.data?.message || SYSTEM_MESSAGES.SUCCESS);
				localStorage.removeItem("access-token");
				dispatch({type: "UNSET_USER_DATA"})
				router.push(FRONTEND_PATH.HOME);
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
