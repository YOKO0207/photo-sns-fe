import { PostThreadCommentCreateInput } from "types";
import { AnySchema, object, string } from "yup";

const content = string().required("");
export const postThreadCommentSchema = object<
	Record<keyof PostThreadCommentCreateInput, AnySchema>
>({
	content,
});
