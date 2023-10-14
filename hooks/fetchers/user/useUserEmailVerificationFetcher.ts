import { fetcherService } from "@/adapters";
import { SYSTEM_MESSAGES } from "@/libs/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import { UserEmailVerificationResendInput } from "types";

type VerifyState = "verifying" | "verify-success" | "verify-failed";

export const useUserEmailVerifyFetcher = () => {
	const [verifyState, setVerifyState] = useState<VerifyState>("verifying");
	const { showBoundary } = useErrorBoundary();

	const verifyUserEmail = async (apiUrl: string) => {
		setVerifyState("verifying");
		try {
			const res = await fetcherService.get(apiUrl);
			if (res && res.status >= 200 && res.status < 300) {
				setVerifyState("verify-success");
			} else {
				setVerifyState("verify-failed");
			}
		} catch (error) {
			setVerifyState("verify-failed");
			showBoundary(error);
		}
	};

	return {
		verifyUserEmail,
		verifyState,
	};
};

export const useUserEmailVerificationResendFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const { showBoundary } = useErrorBoundary();
	const router = useRouter();

	const resendUserEmailVerification = async (
		apiUrl: string,
		redirectPath: string,
		input: UserEmailVerificationResendInput
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
		resendUserEmailVerification,
		isFormLoading,
	};
};
