import { ref } from "vue";
import axios from "axios";
import { getDateDifference } from "@/helpers/date.js";
import { between } from "@/helpers/global.js";

export const useWidgetsFetch = (url, dateType) => {
	const currentWeek = ref(null);
	const prevWeek = ref(null);
	const error = ref(null);
	const data = ref(null);

	axios
		.get(url)
		.then(response => {
			data.value = response.data;
			currentWeek.value = response.data.filter(item => getDateDifference(item[dateType]) <= 7);
			prevWeek.value = response.data.filter(item => between(7, 14, getDateDifference(item[dateType])));
		})
		.catch(error => error.value = error)

	return { data, error, currentWeek, prevWeek }
}
