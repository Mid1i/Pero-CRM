import {nextTick, ref} from "vue";
import {Chart} from "chart.js/auto";
import {getPastDate, getFormattedDate} from "@/helpers/date.js";
import {createGradient} from "@/plugins/chartsGradient.js";
import {createArrayFromObject} from "@/helpers/global.js";
import {onFormatDay} from "@/helpers/formatter.js";

export const useCharts = (currentWeek, previousWeek, config, canvasRef, type) => {
	const weekData = ref([]);

	const datesComparison = (item, date) => getFormattedDate(item.date_of_registration) === date ? 1 : 0;

	for (let i = 1; i <= 7; i++) {
		const currentDate = getFormattedDate(getPastDate(7 - i));
		const previousWeekDate = getFormattedDate(getPastDate(14 - i));
		const day = onFormatDay(new Date(currentDate).getDay());
		
		let data = 0;
		let previousData = 0;

		if (type === "users") {
			currentWeek.map(item => (data += datesComparison(item, currentDate)));
			previousWeek.map(item => (previousData += datesComparison(item, previousWeekDate)));
		} else {
			currentWeek.map(item => {
				if (getFormattedDate(item.date_of_creating) === currentDate) {
					data += item.price;
					previousData++;
				}
			})
		}

		weekData.value.push({
			data: data,
			previousData: previousData,
			previousWeekDate: previousWeekDate,
			date: currentDate,
			day: day,
		});
	}

	nextTick(() => {
		const [
			data, 
			previousData, 
			previousWeekDate, 
			date, 
			day
		] = Object.keys(weekData.value[0]).map(item => createArrayFromObject(weekData, item));

		if (type === "users") {
			new Chart(canvasRef.value.getContext("2d"), config(data, previousData, previousWeekDate, date, day));
		} else {
			const topCanvasPoint = canvasRef.value.getBoundingClientRect().top;
			new Chart(canvasRef.value.getContext("2d"), config(data, previousData, date, day, createGradient(canvasRef.value, topCanvasPoint)));
		}

		Chart.defaults.font.family = "Manrope";
	});
}
