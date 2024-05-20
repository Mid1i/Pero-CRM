export interface UserAPIType {
	id: number,
	name: string,
	age: number,
	gender: boolean,
	orders: number[],
	status: "admin" | "banned" | "consumer",
	email: string,
	phone: number,
	date_of_registration: number
};