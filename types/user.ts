// user
export interface User {
	id: number;
	name: string;
	email: string;
}

// user account
export type UserEmailUpdateInput = {
	email: string;
	password: string;
};

export type UserPasswordUpdateInput = {
	current_password: string;
	password: string;
	password_confirmation: string;
};

export type UserNameUpdateInput = {
	name: string;
};

// user auth
export type UserRegisterInput = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export type UserLoginInput = {
	email: string;
	password: string;
};

export type UserEmailVerificationResendInput = {
	email: string;
};

// password reset
export type PasswordForgetInput = {
	email: string;
};

export type PasswordResetInput = {
	password: string;
	password_confirmation: string;
};

export type PasswordResetRequest = {
	token: string;
	email: string;
	password: string;
	password_confirmation: string;
};