import { ListUser } from "@/types";

export interface PostThreads {
	id: number;
	x: number;
	y: number;
	user: ListUser;
}
export type PostThreadCreateInput = {
	x: number;
	y: number;
};
export type PostThreadCreateInputReturnValue = {
	id: number;
};
export type PostThreadUpdatePositionInput = {
	x: number;
	y: number;
};
export interface DeltaPosition {
	x: number;
	y: number;
}
