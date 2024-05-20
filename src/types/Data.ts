import {type Ref} from "vue";
import type {OrderAPIType, UserAPIType, ProductAPIType} from "@/types/index";


export type APIData = OrderAPIType | UserAPIType | ProductAPIType;

export interface SeparateData {
	data: APIData[] | null,
	currentWeek: APIData[],
	previousWeek: APIData[],
	loading: boolean
};

export interface FetchData {
	data: Ref<APIData[] | null>,
	loading: Ref<boolean>
}