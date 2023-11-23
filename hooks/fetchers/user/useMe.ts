import { BASE_API_URL } from "@/libs/constants";
import { BACKEND_ROUTES } from "@/libs/routes";
import { SWRFetcher } from "@/libs/utils";
import useSWR from "swr";
import { User } from "types";

export const useMe = () => {
	const apiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.ME}`;

	const {
		data,
		error,
		isLoading,
	} = useSWR(apiUrl, SWRFetcher<User>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { data, isLoading };
};
