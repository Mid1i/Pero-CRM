import {ref, watch} from "vue";
import {getPastDate, getCurrentDate} from "@/helpers/date";
import {useFetch} from "@/composables/fetch";


export const useTwoWeeksData = (url, dateType) => {
	const currentWeek = ref([]);
	const previousWeek = ref([]);
	const status = ref("loading");

	const params = {
		[`${dateType}[from]`]: getPastDate(14),
		[`${dateType}[to]`]: getCurrentDate()
	};

	const {data, error, loading} = useFetch(url, params);


	watch(loading, () => {
		if (!loading.value && data.value) {
			data.value.map(item => item[dateType] > getPastDate(7) ? currentWeek.value.push(item) : previousWeek.value.push(item));
			status.value = "success";
		}
	});

	return {data, error, currentWeek, previousWeek, status};
}