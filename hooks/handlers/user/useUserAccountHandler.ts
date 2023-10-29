import {
	useUserEmailUpdateFetcher,
	useUserPasswordUpdateFetcher,
	useUserProfileUpdateFetcher,
} from "@/hooks/fetchers";
import { BACKEND_ROUTES } from "@/libs/routes";
import {
	UserEmailUpdateInput,
	UserNameUpdateInput,
	UserPasswordUpdateInput,
} from "@/types";

export const useUserUpdateEmailHandler = () => {
	const { updateUserEmail, isFormLoading } = useUserEmailUpdateFetcher();

	const handleUserUpdateEmail = (args: { input: UserEmailUpdateInput }) => {
		const { input } = args;
		const apiUrl = BACKEND_ROUTES.USER.ACCOUNT.EMAIL;
		const validationErrors = updateUserEmail({ apiUrl, input });
		return validationErrors;
	};
	return { handleUserUpdateEmail, isFormLoading };
};

export const useUserUpdatePasswordHandler = () => {
	const { updateUserPassword, isFormLoading } = useUserPasswordUpdateFetcher();

	const handleUserUpdatePassword = (args: {
		input: UserPasswordUpdateInput;
	}) => {
		const { input } = args;
		const apiUrl = BACKEND_ROUTES.USER.ACCOUNT.PASSWORD;
		const validationErrors = updateUserPassword({ apiUrl, input });
		return validationErrors;
	};
	return { handleUserUpdatePassword, isFormLoading };
};

export const useUserUpdateProfileHandler = () => {
	const { updateUserProfile, isFormLoading } = useUserProfileUpdateFetcher();

	const handleUserUpdateProfile = (args: { input: UserNameUpdateInput }) => {
		const { input } = args;
		const apiUrl = BACKEND_ROUTES.USER.ACCOUNT.NAME;
		const validationErrors = updateUserProfile({ apiUrl, input });
		return validationErrors;
	};
	return { handleUserUpdateProfile, isFormLoading };
};
