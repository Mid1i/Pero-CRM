import {ref, watch} from "vue";
import {getPastDate, getCurrentDate} from "@/helpers/date";
import {useFetch} from "@/composables/fetch";
import type {APIData, TwoWeeksData} from "@/types/index";


export const useTwoWeeksData = (url: string, dateType: string): TwoWeeksData => {
	const currentWeek = ref<APIData[]>([]);
	const previousWeek = ref<APIData[]>([]);
	const loadingWeekData = ref<boolean>(true);

	const params = {
		[`${dateType}[from]`]: getPastDate(14),
		[`${dateType}[to]`]: getCurrentDate()
	};

	const {data, loading} = useFetch(url, params);
	
	watch(loading, (): void => {
		if (data.value) {
			data.value.map((item: APIData): number => item[dateType] > getPastDate(7) ? currentWeek.value.push(item) : previousWeek.value.push(item));
			loadingWeekData.value = false;
		}
	});

	return {data, currentWeek, previousWeek, loadingWeekData};
}