import { useMe } from "@/hooks/fetchers"
import { useRouter } from "next/router";
import { FRONTEND_PATH, BACKEND_ROUTES } from "@/libs/routes";
import { useEffect, useState } from "react";
import { fetcherService } from "@/adapters";
import { BASE_API_URL } from "@/libs/constants";

export const useCheckAuth = (middleware: "user" | "guest") => {
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter();

	useEffect(() => {
		const apiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.ME}`;
		setIsLoading(true)
		const res = fetcherService.get(apiUrl);
		res.then((res) => {
			if (res && res.status >= 200 && res.status < 300 && res.data.data) {
				if (middleware === "guest") {
					router.push(FRONTEND_PATH.HOME);
				}
			} else {
				if (middleware !== "guest") {
					router.push(FRONTEND_PATH.ERROR.UNAUTHENTICATED);
				}
			}
		}).finally(() => {
			setIsLoading(false)
		})
	}, [router, middleware])

	return { isLoading };
};