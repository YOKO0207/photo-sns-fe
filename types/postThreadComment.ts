import { ListUser } from "@/types";

export interface PostThreadComments {
	id: number;
	updated_at: string;
	content: string;
	user: ListUser;
}

export type PostThreadCommentCreateInput = {
	content: string;
};
