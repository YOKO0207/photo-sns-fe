import { string, ref } from "yup";

export const name = string()
	.trim()
	.required("必須項目です")
	.max(255, "255文字以内で入力してください");

export const email = string()
	.trim()
	.required("必須項目です")
	.email("メールアドレスの形式で入力してください")
	.max(255, "255文字以内で入力してください");

export const password = string().trim().required("必須項目です");

export const password_confirmation = string()
	.trim()
	.required("必須項目です")
	.oneOf([ref("password")], "パスワードが一致しません");

export const current_password = string().trim().required("必須項目です");
