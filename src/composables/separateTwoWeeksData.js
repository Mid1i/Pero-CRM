import {ref, watch} from "vue";
import {getPastDate, getCurrentDate} from "@/helpers/date.js";
import {useFetch} from "@/composables/fetch.js";


export const useTwoWeeksData = (url, dateType) => {
	const currentWeek = ref([]);
	const previousWeek = ref([]);
	const status = ref("loading");

	const params = {
		[`${dateType}[from]`]: getPastDate(14),
		[`${dateType}[to]`]: getCurrentDate()
	};

	const {data, error} = useFetch(url, params);


	watch(data, () => {
		data?.value.map(item => {
			if (item[dateType] > getPastDate(7)) {
				currentWeek.value.push(item);
			} else {
				previousWeek.value.push(item);
			}
		});
		status.value = "success";
	});

	return {data, error, currentWeek, previousWeek, status};
}