export const FRONTEND_PATH = {
	HOME: "/",

	POSTS: {
		DETAIL: "/posts/[postId]",
		NEW: "/posts/new",
	},

	USER: {
		ACCOUNT: {
			EMAIL: {
				EMAIL_VERIFICATIOIN: "/user/account/email/email-verification",
				INDEX: "/user/account/email",
				SENT: "/user/account/email/sent",
			},
			NAME: "/user/account/name",
			PASSWORD: "/user/account/password",
		},
		EMAIL_VERIFICATION: {
			INDEX: "/user/email-verification",
			RESEND: "/user/email-verification/resend",
			SENT: "/user/email-verification/sent",
		},
		LOGIN: "/user/login",
		REGISTER: "/user/register",

		PASSWORD_FORGET: {
			INDEX: "/user/password-forget",
			SENT: "/user/password-forget/sent",
		},
		PASSWORD_RESET: {
			INDEX: "/user/password-reset",
			COMPLETED: "/user/password-reset/completed",
		},
		POSTS: "user/posts"
	},

	ERROR: {
		UNAUTHENTICATED: "/401",
		UNAUTHORIZED: "/403",
		NOT_FOUND: "/404",
		INTERNAL_SERVER_ERROR: "/500",
	},
};
