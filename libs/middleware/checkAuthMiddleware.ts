import { BACKEND_ROUTES, FRONTEND_PATH } from "../routes";
import { User } from "@/types";
import { BASE_API_URL } from "@/libs/constants";
import { fetcherService } from "@/adapters";

export async function checkAuthMiddleware(
	context: any,
	middleware: "user" | "guest"
) {
	const apiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.ME}`;
	const cookies = context.req ? context.req.headers.cookie : undefined;
	const referer = process.env.NEXT_PUBLIC_FRONT_BASE_URL;
	const headers = {
		Cookie: cookies,
		referer: referer,
	};

	const res = await fetcherService.serverSideGet<User>(apiUrl, headers);
	if (res?.data?.data && res?.status >= 200 && res.status < 300) {
		if (middleware === "guest") {
			return {
				redirect: {
					destination: FRONTEND_PATH.HOME,
					permanent: false,
				},
			};
		} 
	} else {
		if (middleware !== "guest") {
			return {
				redirect: {
					destination: FRONTEND_PATH.ERROR.UNAUTHENTICATED,
					permanent: false,
				},
			};
		}
	}

	return {
		props: {},
	};
}
