import { PasswordForgetInput, PasswordResetInput } from "types";
import { AnySchema, object } from "yup";
import { email, password_confirmation, password } from "./util";

export const passwordForgetInputSchema = object<
	Record<keyof PasswordForgetInput, AnySchema>
>({
	email,
});

export const passwordResetInputSchema = object<
	Record<keyof PasswordResetInput, AnySchema>
>({
	password,
	password_confirmation,
});
