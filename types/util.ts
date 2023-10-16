export interface ReturnResponse<T> {
	status: number;
	data: {
		message: string;
		data?: T | undefined;
		meta?: Meta;
		errors?: {
			[key: string]: string[];
		};
	};
}

export interface BlobReturnResponse {
	status: number;
	data: Blob;
}

export interface Meta {
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
	query_string: string;
	has_more_pages: boolean;
}

export interface ErrorResponse {
	status: number;
	data: {
		message: string;
		errors?: {
			[key: string]: string[];
		};
	};
}

export type colorOptions =
	| "primary"
	| "secondary"
	| "tertiary"
	| "warning"
	| "success"
	| "error"
	| "gray"
	| "grayVariant";

export type sizeOptions = "xs" | "sm" | "md" | "lg" | "xl";

export interface StatusProps {
	key: string;
	label: string;
	value: number;
	color: colorOptions;
}
[];

export interface ListFunc {
	key: string;
	name: string;
	function: () => void;
	modal?: {
		title: string;
		description?: string;
	};
}
