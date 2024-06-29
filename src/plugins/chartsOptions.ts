import { ChartOptions, TooltipOptions } from "chart.js";
import { doughnutTooltipCallbacks, revenueTooltipCallbacks, usersTooltipCallbacks } from "@/plugins/chartsCallbacks";
import { xAxis, yAxis } from "@/plugins/chartsAxes";


type TypeOptions = (type: string, weekDates: string[], extraData: string[], array?: number[]) => ChartOptions<"line" | "doughnut" | "bar">;
type TypeTooltipOptions = (type: string, weekDates?: string[], extraData?: string[]) => Partial<TooltipOptions<"line" | "doughnut" | "bar">>;


export const options: TypeOptions = (type, weekDates, extraData, array) => ({
	maintainAspectRatio: false,
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: tooltipOptions(type, weekDates, extraData)
	},
	scales: {
		y: yAxis(type, array),
		x: xAxis
	},
});


export const tooltipOptions: TypeTooltipOptions = (type, weekDates = [], extraData = []) => ({
	cornerRadius: 10,
	displayColors: false,
	titleAlign: "center",
	titleMarginBottom: 20,
	bodyFont: {
		size: 20,
		weight: "bold",
	},
	bodyAlign: "center",
	callbacks: (() => {
		const types = {
			revenue: revenueTooltipCallbacks(weekDates, extraData),
			users: usersTooltipCallbacks(weekDates, extraData),
			doughnut: doughnutTooltipCallbacks()
		}

		return types[type];
	})(),
	padding: {
		y: 10,
		x: 20,
	},
	titleColor: "rgb(235, 235, 245, 0.6)",
	titleFont: {
		size: 14,
		weight: "normal",
	},
	footerColor: "rgb(235, 235, 245, 0.6)",
	footerAlign: "center",
	footerMarginTop: 20,
	footerFont: {
		size: 14,
		weight: "normal",
	}
});