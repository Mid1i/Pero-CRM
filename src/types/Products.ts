export interface IProductsAPI {
	id: number,
	name: string,
	src: string,
	color: string[],
	brand: string,
	price: number,
	gender: boolean,
	sizes: Record<string, number>,
	status: boolean
};