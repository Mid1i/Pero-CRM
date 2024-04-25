import axios from "axios";
import { reactive } from "vue";

import { getDateDifference } from "@/helpers/DateWorkers.js";
import { between } from "@/helpers/Global.js";


export const getWidgetsData = async (url, dateType) => {
	const requestData = reactive({
		data: null,
		previousWeekData: null,
		status: "loading",
		error: null,
	});

	await axios.get(url)
						.then(response => {
							requestData.data = response.data.filter(
								item => getDateDifference(item[dateType]) <= 7
							)
							requestData.previousWeekData = response.data.filter(item =>
								between(7, 14, getDateDifference(item[dateType]))
							)
							requestData.status = "success"
						})
						.catch(error => {
							requestData.error = error
							requestData.status = "error"
						});

	return requestData;
}
