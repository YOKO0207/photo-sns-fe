import {
	useUserLoginFetcher,
	useUserLogoutFetcher,
	useUserRegisterFetcher,
} from "@/hooks/fetchers";
import { BACKEND_ROUTES } from "@/libs/routes";
import { UserLoginInput, UserRegisterInput } from "@/types";

export const useUserRegisterHandler = () => {
	const { registerAsUser, isFormLoading } = useUserRegisterFetcher();

	const handleUserRegister = (args: {input: UserRegisterInput}) => {
		const { input } = args;
		const apiUrl = BACKEND_ROUTES.USER.REGISTER;
		const validationErrors = registerAsUser({apiUrl, input});
		return validationErrors;
	};
	return { handleUserRegister, isFormLoading };
};

export const useUserLoginHandler = () => {
	const { loginAsUser, isFormLoading } = useUserLoginFetcher();

	const handleUserLogin = (args: {input: UserLoginInput}) => {
		const { input } = args;
		const apiUrl = BACKEND_ROUTES.USER.LOGIN;
		const validationErrors = loginAsUser({apiUrl, input});
		return validationErrors;
	};
	return { handleUserLogin, isFormLoading };
};

export const useUserLogoutHandler = () => {
	const { logoutAsUser, isFormLoading } = useUserLogoutFetcher();

	const handleUserLogout = () => {
		const apiUrl = BACKEND_ROUTES.USER.LOGOUT;
		logoutAsUser({apiUrl});
	};
	return { handleUserLogout, isFormLoading };
};
