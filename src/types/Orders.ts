export interface ISizes {
	id: number,
	count: number,
	size: number
};

export interface IOrdersAPI {
	id: number,
	order: ISizes[],
	price: number,
	comment: string,
	user_id: number,
	date_of_creating: number
}
