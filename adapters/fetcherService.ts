/*
 *creates a service that uses the axios client to make api requests
 */
import { ReturnResponse, BlobReturnResponse, ErrorResponse } from "types";
import { axiosClient, axiosClientMultiForm } from "@/adapters";
import { ALERT_ERROR_RESPONSE_CODE } from "@/libs/constants";

/**
 * Inside catch statement, if error code is one of the ALERT_ERROR_RESPONSE_CODE,
 * return error object to show alert message, otherwise throw error object to redirect to an error page
 */
class FetcherService {
	async get<T>(
		url: string
	): Promise<ReturnResponse<T> | undefined> {
		try {
			const response = await axiosClient.get(url);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	async SWRGet<T>(url: string): Promise<ReturnResponse<T> | undefined> {
		try {
			const response = await axiosClient.get(url);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	// for serverside rendering, not to throw an error when error occurs
	async serverSideGet<T>(
		url: string,
		headers?: any
	): Promise<ReturnResponse<T> | undefined> {
		try {
			const response = await axiosClient.get(url, { headers });
			return response;
		} catch (error: any) {
			return error.response;
		}
	}
	async getBlob(url: string): Promise<BlobReturnResponse | undefined> {
		try {
			const response = await axiosClient.get(url, { responseType: "blob" });
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	async post<T, TReturnValues>(
		apiUrl: string,
		input: T | FormData
	): Promise<ReturnResponse<{} | TReturnValues> | undefined> {
		try {
			const response = await axiosClient.post(apiUrl, input);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	async postWithReturnValue<T, TReturnValues>(
		apiUrl: string,
		input: T | FormData
	): Promise<ReturnResponse<TReturnValues> | undefined> {
		try {
			const response = await axiosClient.post(apiUrl, input);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	// for multipart/form-data. e.g. uploading files
	async multiPost(
		apiUrl: string,
		input: FormData
	): Promise<ReturnResponse<{}> | undefined> {
		try {
			const response = await axiosClientMultiForm.post(apiUrl, input);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	async put<T>(
		apiUrl: string,
		input: T
	): Promise<ReturnResponse<{}> | undefined> {
		try {
			const response = await axiosClient.put(apiUrl, input);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
	async delete(apiUrl: string): Promise<ReturnResponse<{}> | undefined> {
		try {
			const response = await axiosClient.delete(apiUrl);
			return response;
		} catch (error: any) {
			if (ALERT_ERROR_RESPONSE_CODE.includes(error?.response?.status))
				return error.response;
			else throw error.response;
		}
	}
}

export const fetcherService = new FetcherService();
