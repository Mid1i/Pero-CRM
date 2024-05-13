import {type Ref} from "vue";
import type {OrderAPIType, UserAPIType, ProductAPIType} from "@/types/index";


export type APIData = OrderAPIType | UserAPIType | ProductAPIType;

export interface TwoWeeksData {
	data: Ref<APIData[] | null>,
	currentWeek: Ref<APIData[]>,
	previousWeek: Ref<APIData[]>,
	loadingWeekData: Ref<boolean>
};