import { reactive, watch } from "vue";

import { getPastDate, getCurrentDate } from "@/helpers/date";
import { useAxios } from "@/composables/axios";


interface ISeparateData<T> {
	data: T[] | null,
	currentWeek: T[],
	previousWeek: T[],
	isLoading: boolean
};


export const useSeparateData = <T>(url: string, dateType: string): ISeparateData<T> => {
	const separateData: ISeparateData<T> = reactive({
		data: null,
		currentWeek: [],
		previousWeek: [],
		isLoading: true
	});

	const params = {
		[`${dateType}[from]`]: getPastDate(14),
		[`${dateType}[to]`]: getCurrentDate()
	};
	
	const {data, isLoading} = useAxios<T>(url, params);
	
	watch(isLoading, () => {
		if (data.value) {
			data.value.map((item: T) => item[dateType] > getPastDate(7) ? separateData.currentWeek.push(item) : separateData.previousWeek.push(item));
			separateData.data = data.value;
			separateData.isLoading = false;
		}
	});

	return separateData;
}