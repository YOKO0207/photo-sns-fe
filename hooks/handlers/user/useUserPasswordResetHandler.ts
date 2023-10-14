import {
	useUserPasswordForgetFetcher,
	useUserPasswordResetFetcher,
} from "@/hooks/fetchers";
import { BASE_API_URL, SYSTEM_MESSAGES } from "@/libs/constants";
import { BACKEND_ROUTES, FRONTEND_PATH } from "@/libs/routes";
import {
	PasswordForgetInput,
	PasswordResetInput,
	PasswordResetRequest,
} from "@/types";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";

export const useUserPasswordForgetHandler = () => {
	const { sendPasswordResetEmail, isFormLoading } =
		useUserPasswordForgetFetcher();

	const handleUserPasswordForget = (input: PasswordForgetInput) => {
		const apiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.USER.PASSWORD_RESET.PASSWORD_FORGET}`;
		const redirectPath = FRONTEND_PATH.USER.PASSWORD_FORGET.SENT;
		const validationErrors = sendPasswordResetEmail(apiUrl, redirectPath, {
			...input,
		});
		return validationErrors;
	};

	return { handleUserPasswordForget, isFormLoading };
};

export const useUserPasswordResetHandler = () => {
	const { resetUserPassword, isFormLoading } = useUserPasswordResetFetcher();
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	const handleUserPasswordReset = (input: PasswordResetInput) => {
		const apiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.USER.PASSWORD_RESET.PASSWORD_RESET}`;
		const redirectPath = FRONTEND_PATH.USER.PASSWORD_RESET.COMPLETED;

		if (router.isReady) {
			const { token, email } = router.query;
			if (token == undefined || email == undefined) {
				showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
				return null;
			}

			const tokenValue = Array.isArray(token)
				? String(token[0] || "")
				: String(token);
			const emailValue = Array.isArray(email)
				? String(email[0] || "")
				: String(email);

			const request: PasswordResetRequest = {
				...input,
				token: tokenValue,
				email: emailValue,
			};

			const validationErrors = resetUserPassword(apiUrl, redirectPath, {
				...request,
			});
			return validationErrors;
		}
	};

	return { handleUserPasswordReset, isFormLoading };
};
