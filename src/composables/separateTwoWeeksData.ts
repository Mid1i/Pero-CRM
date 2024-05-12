import {ref, watch} from "vue";
import {getPastDate, getCurrentDate} from "@/helpers/date";
import {useFetch} from "@/composables/fetch";
import type {OrderAPIType, UserAPIType, ProductAPIType} from "@/types/index";


type WeekData = OrderAPIType | UserAPIType | ProductAPIType;


export const useTwoWeeksData = (url: string, dateType: string) => {
	const currentWeek = ref<WeekData[]>([]);
	const previousWeek = ref<WeekData[]>([]);
	const loadingWeekData = ref<boolean>(true);

	const params = {
		[`${dateType}[from]`]: getPastDate(14),
		[`${dateType}[to]`]: getCurrentDate()
	};

	const {data, loading} = useFetch(url, params);
	
	watch(loading, () => {
		if (!loading.value && data.value) {
			data.value.map((item: WeekData) => item[dateType] > getPastDate(7) ? currentWeek.value.push(item) : previousWeek.value.push(item));
			loadingWeekData.value = false;
		}
	});

	return {data, currentWeek, previousWeek, loadingWeekData};
}