export const BACKEND_ROUTES = {
	CSRF_TOKEN: "sanctum/csrf-cookie",
	ME: "me",

	USER: {
		ACCOUNT: {
			EMAIL: "user/account/email",
			NAME: "user/account/name",
			PASSWORD: "user/account/password",
			DESTROY: "user/account/client",
		},
		EMAIL_VERIFICATION: {
			RESEND: "user/email-verification/resend",
		},
		LOGIN: "user/login",
		REGISTER: "user/register",
		LOGOUT: "user/logout",

		PASSWORD_RESET: {
			PASSWORD_FORGET: "user/password-forget",
			PASSWORD_RESET: "user/password-reset",
		},
	},
};