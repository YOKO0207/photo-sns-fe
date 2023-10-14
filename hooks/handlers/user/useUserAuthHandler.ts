import {
	useUserLoginFetcher,
	useUserLogoutFetcher,
	useUserRegisterFetcher,
} from "@/hooks/fetchers";
import { BACKEND_ROUTES, FRONTEND_PATH } from "@/libs/routes";
import { UserLoginInput, UserRegisterInput } from "@/types";

export const useUserRegisterHandler = () => {
	const { registerAsUser, isFormLoading } = useUserRegisterFetcher();

	const handleUserRegister = (input: UserRegisterInput) => {
		const apiUrl = BACKEND_ROUTES.USER.REGISTER;
		const redirectPath = FRONTEND_PATH.USER.EMAIL_VERIFICATION.SENT;
		const validationErrors = registerAsUser(apiUrl, redirectPath, { ...input });
		return validationErrors;
	};
	return { handleUserRegister, isFormLoading };
};

export const useUserLoginHandler = () => {
	const { loginAsUser, isFormLoading } = useUserLoginFetcher();

	const handleUserLogin = (input: UserLoginInput) => {
		const apiUrl = BACKEND_ROUTES.USER.LOGIN;
		const validationErrors = loginAsUser(apiUrl, { ...input });
		return validationErrors;
	};
	return { handleUserLogin, isFormLoading };
};

export const useUserLogoutHandler = () => {
	const { logoutAsUser, isFormLoading } = useUserLogoutFetcher();

	const handleUserLogout = () => {
		const apiUrl = BACKEND_ROUTES.USER.LOGOUT;
		const redirectPath = FRONTEND_PATH.USER.LOGIN;
		logoutAsUser(apiUrl, redirectPath);
	};
	return { handleUserLogout, isFormLoading };
};
