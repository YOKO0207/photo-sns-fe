import {
	UserEmailUpdateInput,
	UserNameUpdateInput,
	UserPasswordUpdateInput,
} from "types";
import { AnySchema, object } from "yup";
import {
	current_password,
	email,
	name,
	password,
	password_confirmation,
} from "./util";

export const userEmailUpdateInputSchema = object<
	Record<keyof UserEmailUpdateInput, AnySchema>
>({
	password,
	email,
});

export const userPasswordUpdateInputSchema = object<
	Record<keyof UserPasswordUpdateInput, AnySchema>
>({
	current_password,
	password,
	password_confirmation,
});

export const userNameUpdateInputSchema = object<
	Record<keyof UserNameUpdateInput, AnySchema>
>({
	name,
});
