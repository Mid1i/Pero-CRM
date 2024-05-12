export interface ProductAPIType {
	id: number,
	name: string,
	src: string,
	color: string[],
	brand: string,
	price: number,
	gender: "male" | "female",
	sizes: {
		[key: string]: number
	},
	status: boolean
};