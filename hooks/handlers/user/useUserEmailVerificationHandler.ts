import { useUserEmailVerifyFetcher, useUserEmailVerificationResendFetcher } from "@/hooks/fetchers";
import { SYSTEM_MESSAGES } from "@/libs/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { BACKEND_ROUTES, FRONTEND_PATH } from "@/libs/routes";
import { UserEmailVerificationResendInput } from "@/types";

export const useUserEmailVerificationResendHandler = () => {
	const { resendUserEmailVerification, isFormLoading } =
		useUserEmailVerificationResendFetcher();

	const handleUserEmailVerificationResend = (
		input: UserEmailVerificationResendInput
	) => {
		const apiUrl = BACKEND_ROUTES.USER.EMAIL_VERIFICATION.RESEND;
		const redirectPath = FRONTEND_PATH.USER.EMAIL_VERIFICATION.SENT;
		const validationErrors = resendUserEmailVerification(apiUrl, redirectPath, {
			...input,
		});
		return validationErrors;
	};
	return { handleUserEmailVerificationResend, isFormLoading };
};

export const useUserEmailVerifyHandler = () => {
	const { verifyUserEmail, verifyState } = useUserEmailVerifyFetcher();
	const router = useRouter();
	const { showBoundary } = useErrorBoundary();

	useEffect(() => {
		if (router.isReady) {
			const { url } = router.query;
			let apiUrl = "";
			if (url == undefined) {
				showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
				return;
			}
			if (Array.isArray(url)) {
				apiUrl = String(url[0] || "");
			} else {
				apiUrl = String(url || "");
			}
			verifyUserEmail(apiUrl);
		}
	}, [router.isReady, router.query, showBoundary]);

	return { verifyState };
};
