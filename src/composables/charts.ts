import { Ref, ref } from "vue";
import { Chart } from "chart.js/auto";
import type { IOrdersAPI, IUsersAPI } from "@/interfaces";

import { getFormattedDate, getPastDate } from "@/helpers/date";
import { createGradient } from "@/plugins/chartsGradient";
import { createArrayFromObject } from "@/helpers/global";
import { onFormatDay } from "@/helpers/formatters";


type TypePropsWeeks = IOrdersAPI | IUsersAPI;

interface WeekData {
	data: number,
	previousData: number,
	previousWeekDate: string,
	date: string,
	day: string
};


export const useCharts = (currentWeek: TypePropsWeeks[], previousWeek: TypePropsWeeks[], config: Function, canvasRef: Ref<HTMLCanvasElement | null>, type: string) => {
	const weekData = ref<WeekData[]>([]);


	const compareDates = (item: TypePropsWeeks, date: string) => ("date_of_registration" in item && getFormattedDate(item.date_of_registration) === date) ? 1 : 0;

	const calculateUsersData = (date: string, previousDate: string): Record<string, number> => {
		const data = currentWeek.reduce((value: number, item: TypePropsWeeks): number => value += compareDates(item, date), 0);
		const previousData = previousWeek.reduce((value: number, item: TypePropsWeeks): number => value += compareDates(item, previousDate), 0);

		return {data, previousData};
	}

	const calculateOrdersData = (date: string): Record<string, number> => {
		const [data, previousData] = currentWeek.reduce((value: number[], item: TypePropsWeeks): number[] => {
			if ("price" in item && getFormattedDate(item.date_of_creating) === date) {
				return [value[0] += item.price, value[1] += 1];
			}
			return value;
		}, [0, 0]);

		return {data, previousData};
	}


	for (let i = 1; i <= 7; i++) {
		const currentDate = getFormattedDate(getPastDate(7 - i));
		const previousWeekDate = getFormattedDate(getPastDate(14 - i));
		const day = onFormatDay(new Date(currentDate).getDay());

		const types = {
			users: calculateUsersData(currentDate, previousWeekDate),
			orders: calculateOrdersData(currentDate)
		};

		const {data, previousData} = types[type];

		weekData.value.push({
			data: data,
			previousData: previousData,
			previousWeekDate: previousWeekDate,
			date: currentDate,
			day: day,
		});
	}


	if (canvasRef.value) {
		const [
			data, 
			previousData, 
			previousWeekDate, 
			date, 
			day
		] = Object.keys(weekData.value[0]).map((item: string): string[] => createArrayFromObject(weekData.value, item));

		const chart = new Chart(canvasRef.value, config(data, previousData, date, day, previousWeekDate));

		if (type !== "users") {
			const topCanvasPoint = canvasRef.value.getBoundingClientRect().top;
			chart.data.datasets[0].backgroundColor = createGradient(canvasRef.value, topCanvasPoint);
			chart.update();
		}

		Chart.defaults.font.family = "Manrope";
	};
}
