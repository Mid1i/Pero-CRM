export interface OrderArrayType {
	id: number,
	count: number,
	size: number
};

export interface OrderAPIType {
	id: number,
	order: OrderArrayType[],
	price: number,
	comment: string,
	user_id: number,
	date_of_creating: number
}