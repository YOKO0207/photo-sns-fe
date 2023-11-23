// what this file does: creates an axios client with the base url and headers
import { BASE_API_URL } from "@/libs/constants";
import axios from "axios";

const getAuthToken = () => localStorage.getItem("access-token");

const baseURL = BASE_API_URL || "http://localhost/api";
const jsonHeaders = { "Content-Type": "application/json" };
const formHeaders = { "Content-Type": "multipart/form-data" };

function createAxiosClient(baseURL: string, headers: any) {
	const client = axios.create({
		withCredentials: true,
		baseURL,
		headers,
	});

	// Add an interceptor to include the token in every request
	client.interceptors.request.use((config) => {
		const token = localStorage.getItem("access-token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	return client;
}

export const axiosClient = createAxiosClient(baseURL, jsonHeaders);
export const axiosClientMultiForm = createAxiosClient(baseURL, formHeaders);
