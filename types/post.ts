import { ListUser } from "@/types";

export type PostCreateInput = {
	src: File | null;
	post_name?: string;
	post_content?: string;
};

export interface Posts {
	id: number;
	created_at: string;
	src: string;
	post_name?: string;
	post_content?: string;
	user: ListUser;
}

export interface Post {
	id: number;
	created_at: string;
	src: string;
	post_name?: string;
	post_content?: string;
	user: ListUser;
}
