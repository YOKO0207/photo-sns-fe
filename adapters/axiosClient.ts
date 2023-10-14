// what this file does: creates an axios client with the base url and headers
import { BASE_API_URL } from "@/libs/constants";
import axios from "axios";

const baseURL = BASE_API_URL || "http://localhost/api";
const jsonHeaders = { "Content-Type": "application/json" };
const formHeaders = { "Content-Type": "multipart/form-data" };

function createAxiosClient(baseURL: string, headers: any) {
	return axios.create({
		withCredentials: true,
		baseURL,
		headers,
	});
}

export const axiosClient = createAxiosClient(baseURL, jsonHeaders);
export const axiosClientMultiForm = createAxiosClient(baseURL, formHeaders);
