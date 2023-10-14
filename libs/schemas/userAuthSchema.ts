import {
	UserEmailVerificationResendInput,
	UserLoginInput,
	UserRegisterInput,
} from "types";
import { AnySchema, object } from "yup";
import { email, name, password, password_confirmation } from "./util";

export const userRegisterInputSchema = object<
	Record<keyof UserRegisterInput, AnySchema>
>({
	name,
	email,
	password,
	password_confirmation,
});

export const userLoginInputSchema = object<
	Record<keyof UserLoginInput, AnySchema>
>({
	email,
	password,
});

export const userEmailVerificationResendInputSchema = object<
	Record<keyof UserEmailVerificationResendInput, AnySchema>
>({
	email,
});
