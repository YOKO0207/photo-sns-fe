import { fetcherService } from "@/adapters";
import { FRONTEND_PATH } from "../routes";
import { BlobReturnResponse } from "@/types";
import { BASE_BACKEND_URL } from "../constants";

export const removeLastSegment = (url: string) => {
	let segments = url.split("/");
	if (segments.at(-1) === "new" || segments.at(-1) === "edit") {
		segments.pop();
	}
	let newUrl = segments.join("/");
	return newUrl;
};

export function handleError(error: any) {
	return error?.response?.data;
}

export const generateUrl = (
	url: string,
	params: { [key: string]: number | string | string[] }
): string => {
	return url.replace(/\[(\w+)\]/g, (_, key: string) => {
		const paramValue = params[key];
		if (Array.isArray(paramValue)) {
			return String(paramValue[0] || "");
		} else {
			return String(paramValue || "");
		}
	});
};

export const SWRFetcher = async <T>(url: string) => {
	return await fetcherService.SWRGet<T>(url);
};

export const isEmptyObject = (obj: any) => {
	if (obj === undefined || obj === null) return true;
	return Object.keys(obj).length === 0;
};

export const handleDownloadImage = async (
	onDownload: (
		id: number
	) => Promise<BlobReturnResponse | undefined> | undefined | null,
	id: number,
	src: string
) => {
	const res = await onDownload(id);
	const blob = res?.data;
	if (blob === undefined || blob === null) return;
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;

	const pathBaseURL = BASE_BACKEND_URL + "/storage/";
	const downloadName = src.substring(pathBaseURL.length);
	a.download = downloadName;

	document.body.appendChild(a);
	a.click();
	a.remove();
	window.URL.revokeObjectURL(url);
};
