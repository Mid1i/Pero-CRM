import { reactive, watch } from "vue";
import type { APIData, SeparateData } from "@/types/index";
import { getPastDate, getCurrentDate } from "@/helpers/date";
import { useFetch } from "@/composables/fetch";


export const useSeparateData = (url: string, dateType: string): SeparateData => {
	const separateData = reactive<SeparateData>({
		data: null,
		currentWeek: [],
		previousWeek: [],
		loading: true
	});

	const params = {
		[`${dateType}[from]`]: getPastDate(14),
		[`${dateType}[to]`]: getCurrentDate()
	};

	const {data, loading} = useFetch(url, params);
	
	watch(loading, (): void => {
		if (data.value) {
			data.value.map((item: APIData): number => item[dateType] > getPastDate(7) ? separateData.currentWeek.push(item) : separateData.previousWeek.push(item));
			separateData.data = data.value;
			separateData.loading = false;
		}
	});

	return separateData;
}