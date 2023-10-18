import { PostCreateInput } from "types";
import { AnySchema, object, mixed, string } from "yup";

const src = mixed().required("必須項目です");;
const post_name = string().nullable();
const post_content = string().nullable();

export const postCreateInputSchema = object<Record<keyof PostCreateInput, AnySchema>>({
	src,
	post_name,
	post_content,
});
