// user
export interface User {
	id: number;
	name: string;
	email: string;
}
export interface AppUser extends User {
	isLoggedIn: boolean;
}
export interface ListUser {
	id: number;
	name: string;
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

export interface UserAuthResponse extends User {
	access_token: string;
}

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