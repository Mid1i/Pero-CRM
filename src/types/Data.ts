import type {OrderAPIType, UserAPIType, ProductAPIType} from "@/types/index";


export type APIData = OrderAPIType | UserAPIType | ProductAPIType;

export interface SeparateData {
	data: APIData[] | null,
	currentWeek: APIData[],
	previousWeek: APIData[],
	loading: boolean
};