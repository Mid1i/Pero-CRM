import { nextTick, ref } from "vue";
import { Chart } from "chart.js/auto";
import { createArrayFromObject, createGradient } from "@/helpers/global.js";
import { onFormatDate, onFormatDay } from "@/helpers/formatter.js";
import { getCurrentDate, getWeekDate } from "@/helpers/date.js";

export const useCharts = (currentWeek, prevWeek, config, canvasRef, type) => {
	const weekData = ref([])

	const datesComparison = (item, date) => {
		if (item.date_of_registration === date) {
			return 1
		}
		return 0
	}

	const currentDate = getCurrentDate()

	for (let i = 0; i < 7; i++) {
		const date = onFormatDate(getWeekDate(currentDate, 7 - i - 1))
		const prevWeekDate = onFormatDate(getWeekDate(currentDate, 14 - i - 1))
		const day = onFormatDay(new Date(date).getDay())

		let daily = 0
		let prevDaily = 0

		if (type === "users") {
			currentWeek.map(item => (daily += datesComparison(item, date)))
			prevWeek.map(item => (prevDaily += datesComparison(item, prevWeekDate)))
		} else {
			currentWeek.map(item => {
				if (item.date_of_creating === date) {
					daily += item.price
					prevDaily++
				}
			})
		}

		weekData.value.push({
			daily: daily,
			prevDaily: prevDaily,
			prevWeekDate: prevWeekDate,
			date: date,
			day: day,
		})
	}

	nextTick(() => {
		const [
			daily, 
			prevDaily, 
			prevWeekDate, 
			date, 
			day
		] = Object.keys(weekData.value[0]).map(item => createArrayFromObject(weekData, item));

		if (type === "users") {
			new Chart(canvasRef.value.getContext("2d"), config(daily, prevDaily, prevWeekDate, date, day));
		} else {
			const topCanvasPoint = canvasRef.value.getBoundingClientRect().top;
			new Chart(canvasRef.value.getContext("2d"), config(daily, prevDaily, date, day, createGradient(canvasRef.value, topCanvasPoint)));
		}

		Chart.defaults.font.family = "Manrope";
	})
}
